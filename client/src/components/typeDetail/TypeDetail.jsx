import React, { useEffect, useState, useRef } from 'react'
import classes from './typeDetail.module.css'
import img from '../../assets/img4.jpg'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'
import { getDatesInRange, isUnavailable } from '../../utils/dateFunc'

const TypeDetail = () => {
  const [roomDetails, setRoomDetails] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const { id } = useParams()
  const containerRef = useRef()

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room/find/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const room = await res.json()
        setRoomDetails(room)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRoom()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const yourBookedDates = getDatesInRange(startDate, endDate)

    const isUnavailabledDates = isUnavailable(roomDetails, yourBookedDates)

    if (isUnavailabledDates) {
      const lastAvailableDate = new Date(
        roomDetails.unavailableDates[roomDetails.unavailableDates.length - 1]
      )
      const lastAvailableDay = lastAvailableDate.getDate() //we are getting the day
      const lastAvailableMonth = lastAvailableDate.getMonth() //we are getting the month
      // +1 coz it shows month in index like examlple (2nd month of february = indexOf(1))
      //3 -> 03( that is why we use 0${}), 11-> 11
      const formattedMonth =
        lastAvailableMonth + 1 > 9
          ? `${lastAvailableMonth}`
          : `0${lastAvailableMonth + 1}`

      const formattedDay =
        lastAvailableDay > 9 ? `${lastAvailableDay}` : `0${lastAvailableDay}`

      const formattedDayAndMonth = `${formattedDay} - ${formattedMonth}`
      setError(formattedDayAndMonth)
      setTimeout(() => {
        setError(false)
      }, 5000)
      return
    }
    try {
      const res = await fetch(`http://localhost:5000/room/bookRoom/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body: JSON.stringify({
          username,
          email,
          unavailableDates: yourBookedDates,
        }),
      })
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 5000)

      const updatedRoom = await res.json()
      setRoomDetails(updatedRoom)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div ref={containerRef} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.imgWrapper}>
            <img
              src={`http://localhost:5000/images/${roomDetails?.photo}`}
              alt=''
            />
          </div>
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>{roomDetails?.title}</h2>
          <p className={classes.type}>
            Type: <span>{roomDetails?.type}</span>
          </p>
          <div className={classes.review}>
            Review: <AiFillStar className={classes.icon} />
            {roomDetails?.review}
          </div>
          <p className={classes.desc}>
            <span>Description: </span>
            {roomDetails.desc}
          </p>
          <div className={classes.priceAndCountry}>
            <span>Country: {roomDetails?.country}</span>
            <span>
              <span className={classes.price}> {roomDetails?.price}$ </span>
              /per person
            </span>
          </div>
          <form className={classes.typeDetailForm} onSubmit={handleSubmit}>
            <h3>Enter information here</h3>
            <input
              type='text'
              placeholder='Full name'
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={classes.dateContainer}>
              <input
                type='date'
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input type='date' onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button type='submit' className={classes.bookNow}>
              Book now
            </button>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Your date is in the booked range! Last booked day is {error}
            </div>
          )}
          {success && (
            <div className={classes.successMessage}>
              Success! You booked from {startDate} to{endDate}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TypeDetail
