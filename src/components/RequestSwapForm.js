import React, { Component } from 'react'
import axios from 'axios'

export default class RequestSwapForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      chosenShift: '',
      userShift: "",
      userShifts: []
    }
  }

  componentWillMount() {
    axios.get(
      `${process.env.REACT_APP_API_URL}/shiftsbyuser/${localStorage['id']}`
    )
    .then(response => {
      this.setState({
        userShifts: response.data.sort((shift, secondShift) => {
          return shift.start_time - secondShift.start_time
        }),
        chosenShift: this.props.shiftInfo.shiftId
      })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post(
      `${process.env.REACT_APP_API_URL}/requests`,
      {
        requested_shift_id: this.state.chosenShift,
        current_shift_id: this.state.userShift
      }
    )
    .then(response => {
      this.props.history.push('/')
      this.props.history.push('/shifts')
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  formatDate = (time) => {
    return new Date(parseInt(time)).toLocaleString("en-GB", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})
  }

  render() {
    return(
      <form id="request-swap-form" onSubmit={this.handleSubmit}>
        <span className='shift-info-label'>Select a shift:</span>
        <select className="menu" name="userShift" onChange={this.handleChange} value={this.state.userShift}>
          <option className='menu-item'>My shifts</option>
          {this.state.userShifts.map( (shift, index) => {
            if (new Date(parseInt(shift.start_time)) >= new Date()) {
              return <option className="menu-item" key={index} value={shift.id}>{this.formatDate(shift.start_time)} - {this.formatDate(shift.end_time)}</option>
            }
          })}
        </select>
        <br />
        <button id='confirm-swap-request-form' className='custom-button'>Confirm</button>
      </form>
    )
  }
}
