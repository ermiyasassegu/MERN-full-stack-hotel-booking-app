import React, { useEffect, useState } from 'react'
import classes from './suggestedPlaces.module.css'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import img from '../../assets/img6.jpg'
import { useSelector } from 'react-redux'

const SuggestedPlaces = () => {
  const [estates, setEstates] = useState([])
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchTypeRooms = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const estates = await res.json()
        setEstates(estates)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTypeRooms()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id='suggested' className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Most visited places</h5>
          <h2 className={classes.title}>
            Favourite destinations of our clients
          </h2>
        </div>
        <div className={classes.places}>
          {estates.map((suggestedPlace) => (
            <Link
              to={`/typeDetail/${suggestedPlace._id}`}
              className={classes.place}
              key={suggestedPlace._id}
            >
              <div className={classes.imgWrapper}>
                <img src={img} alt='' />
              </div>
              <div className={classes.titleAndReview}>
                <span>{suggestedPlace.title}</span>
                <span className={classes.review}>
                  <AiFillStar className={classes.icon} />
                  {suggestedPlace.review}
                </span>
              </div>
              <div className={classes.countryAndPrice}>
                <span>
                  Country: <span>{suggestedPlace.country}</span>
                </span>
                <span className={classes.price}>
                  {suggestedPlace.price}$ / <span>per person</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuggestedPlaces
