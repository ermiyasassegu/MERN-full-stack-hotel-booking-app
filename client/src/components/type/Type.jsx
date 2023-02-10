import React, { useEffect, useState } from 'react'
import classes from './type.module.css'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'

const Type = () => {
  const [estates, setEstates] = useState([])
  const { type } = useParams()
  const { token } = useSelector((state) => state.auth)

  console.log('type', type)

  useEffect(() => {
    const fetchTypesRooms = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room?type=${type}`, {
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
    fetchTypesRooms()
  }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  console.log('estates', estates)
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}> All {type}s</h5>
          <h2 className={classes.title}>Pick from the best {type}s</h2>
        </div>
        <div className={classes.places}>
          {estates.map((estate) => (
            <Link
              to={`/typeDetail/${estate._id}`}
              className={classes.place}
              key={estate._id}
            >
              <div className={classes.imgWrapper}>
                <img
                  src={`http://localhost:5000/images/${estate.photo}`}
                  alt=''
                />
              </div>
              <div className={classes.titleAndReview}>
                <span>{estate.title}</span>
                <span className={classes.review}>
                  <AiFillStar className={classes.icon} />
                  {estate.review}
                </span>
              </div>
              <div className={classes.countryAndPrice}>
                <span>
                  Country: <span>{estate.country}</span>
                </span>
                <span className={classes.price}>
                  {estate.price}$ / <span>per person</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Type
