import React, { Component } from 'react'

class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    }

  }

  render() {
    const formLabel = this.props.formName;
    const { formValue, errorMessage } = this.state;
    return (
      <div className="RangeInput">
        <form>
          <label>
            { formLabel }
            <p>Interval start</p>
            <input type="time" onChange={ this.props.handleChangeStart }/>
            <p>Interval end</p>
            <input type="time" onChange={ this.props.handleChangeEnd }/>
            {
               this.props.errorMessage && <p>{ this.props.errorMessage }</p>
            }
          </label>
        </form>
      </div>
    );
  }
}

export default RangeInput;
