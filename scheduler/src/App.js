import React, { Component } from 'react'
import './App.css';

import RangeInput from './RangeInput.js'
import CalendarInput from './CalendarInput.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range1Start: "",
      range1End: "",
      range1ErrorMessage: "",
      range2Start: "",
      range2End: "",
      range2ErrorMessage: "",
      calendar1Start: "",
      calendar1End: "",
      schedule1: [],
      calendar2Start: "",
      calendar2End: "",
      schedule2: [],
      meetingLength: 0,
      loading: false
    }
    this.makeRequest = this.makeRequest.bind(this);
    this.handleChangeStart1 = this.handleChangeStart1.bind(this);
    this.handleChangeEnd1 = this.handleChangeEnd1.bind(this);
    this.handleChangeStart2 = this.handleChangeStart2.bind(this);
    this.handleChangeEnd2 = this.handleChangeEnd2.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
  }

  makeRequest() {
    this.setState({loading: true});
    var url = new URL('http://localhost:5000');
    console.log(this.state.schedule1);
    console.log(this.state.schedule2);
    var params = {
      range1: this.state.range1Start.concat('.', this.state.range1End),
      schedule1: this.state.schedule1,
      range2: this.state.range2Start.concat('.', this.state.range2End),
      schedule2: this.state.schedule2,
      meeting_length: this.state.meetingLength
    };
    url.search = new URLSearchParams(params).toString();
    fetch(url).then(res => res.json()).then(data => {
      this.setState({
        meetingSlots: data.msg
      })
    }, []);
    this.setState({loading: false});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Meeting scheduler</h1>
          <p><i>Enter the booked schedule of 2 people & the meeting length to find out when the meeting can take place.</i></p><br/><br/>
          <div>
          <RangeInput formName = { "Schedule #1" }
                      errorMessage = { this.state.range1ErrorMessage }
                      handleChangeStart = { this.handleChangeStart1.bind(this) }
                      handleChangeEnd = { this.handleChangeEnd1.bind(this) }/>
          <CalendarInput formName = { "Select booked timeslots for calendar #1" }
                         handleSlotStart = { (event) => { this.setState({calendar1Start: event.target.value}) } }
                         handleSlotEnd = { (event) => { this.setState({calendar1End: event.target.value}) } }
                         handleAdd = { this.handleCalender1Add.bind(this) }
                         handleClear = { (event) => { this.setState({schedule1: []}) } }
                         calendar = { this.state.schedule1 }/>
          </div><br/><br/>
          <div>
          <RangeInput formName = { "Schedule #2" }
                      errorMessage = { this.state.range2ErrorMessage }
                      handleChangeStart = { this.handleChangeStart2.bind(this) }
                      handleChangeEnd = { this.handleChangeEnd2.bind(this) }/>
          <CalendarInput formName = { "Select booked timeslots for calendar #2" }
                         handleSlotStart = { (event) => { this.setState({calendar2Start: event.target.value}) } }
                          handleSlotEnd = { (event) => { this.setState({calendar2End: event.target.value}) } }
                          handleAdd = { this.handleCalender2Add.bind(this) }
                          handleClear = { (event) => { this.setState({schedule2: []}) } }
                          calendar = { this.state.schedule2 }/>
          </div><br/><br/>
          <form>
            <label>Meeting length</label><br/>
            <input type="text" onChange={ this.handleChangeLength }/>
          </form>
         <button onClick={ this.makeRequest }>Calculate meeting times</button>
         {
           <p>{ this.state.meetingSlots }</p>
         }
        </header>
      </div>
    );
  }

  handleChangeStart1(event) {
    this.setState({
      range1Start: event.target.value
    });

    if(this.state.range1End && this.state.range1End < event.target.value) {
      this.setState({
        range1ErrorMessage: "Interval end can't be before interval start."
      });
    }
    else {
      this.setState({
        range1ErrorMessage: ""
      });
    }
  }

  handleChangeEnd1(event) {
    this.setState({
      range1End: event.target.value
    });

    if(this.state.range1Start && this.state.range1Start  > event.target.value) {
        this.setState({
          range1ErrorMessage: "Interval start can't be after interval end."
        });
    }
    else {
      this.setState({
        range1ErrorMessage: ""
      });
    }
  }

  handleChangeStart2(event) {
    this.setState({
      range2Start: event.target.value
    });

    if(this.state.range2End && this.state.range2End < event.target.value) {
      this.setState({
        range2ErrorMessage: "Interval end can't be before interval start."
      });
    }
    else {
      this.setState({
        range2ErrorMessage: ""
      });
    }
  }

  handleChangeEnd2(event) {
    this.setState({
      range2End: event.target.value
    });

    if(this.state.range2Start && this.state.range2Start  > event.target.value) {
        this.setState({
          range2ErrorMessage: "Interval start can't be after interval end."
        });
    }
    else {
      this.setState({
        range2ErrorMessage: ""
      });
    }
  }

  handleCalender1Add(event) {
    const newSchedule = [...this.state.schedule1, this.state.calendar1Start.concat('.', this.state.calendar1End)]
    this.setState({
      schedule1: newSchedule
    });
  }

  handleCalender2Add(event) {
    const newSchedule = [...this.state.schedule2, this.state.calendar2Start.concat('.', this.state.calendar2End)]
    this.setState({
      schedule2: newSchedule
    });
  }

  handleChangeLength(event) {
    this.setState({
      meetingLength: event.target.value
    })
  }
}

export default App;
