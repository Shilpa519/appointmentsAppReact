import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: new Date(), appointmentList: []}

  onChangeOfTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeOfDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    console.log(newAppointment)
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: new Date(),
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickOfStarredBtn = () => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.isStarred) {
          return {...eachItem}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {title, date, appointmentList} = this.state

    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="title">Add Appointment</h1>
          <div className="form-image-container">
            <form
              className="appointment-date-container"
              onSubmit={this.onAddAppointment}
            >
              <label htmlFor="title" className="appointment-title">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="title-input"
                onChange={this.onChangeOfTitle}
                value={title}
              />
              <label htmlFor="date" className="appointment-title">
                DATE
              </label>

              <input
                id="date"
                type="date"
                className="title-input"
                onChange={this.onChangeOfDate}
                value={date}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="add-appointments-container">
            <div className="head-starred-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className="star-button"
                type="button"
                data-testid="star"
                onClick={this.onClickOfStarredBtn}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-container">
              {appointmentList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
