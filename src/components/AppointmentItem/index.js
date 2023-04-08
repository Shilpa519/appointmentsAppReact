import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  console.log(isStarred)

  const onClickStarIcon = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button type="button" className="button" onClick={onClickStarIcon}>
          <img src={starImgUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
