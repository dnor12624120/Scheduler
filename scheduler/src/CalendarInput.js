import React, { Component } from 'react'

class CalendarInput extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="CalendarInput">
        <form>
          <p>{ this.props.formName }</p>
          <input type="time" onChange={ this.props.handleSlotStart }/>
          <input type="time" onChange={ this.props.handleSlotEnd }/>
        </form>
        <button onClick={ this.props.handleAdd }>Add</button>
        <button onClick={ this.props.handleClear }>Clear</button>
        { this.props.calendar.map((timeslot) => <p>{ timeslot }</p>)}
      </div>
    );
  }
}

export default CalendarInput;
