import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import classes from './create.module.css'
import { useSelector } from 'react-redux'

const Create = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [country, setCountry] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(0)
  const [review, setReview] = useState(0)
  const [typeError, setTypeError] = useState(false)
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const changeImg = (e) => {
    setImg(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImg((prev) => null)
  }
  const handleCreateRoom = async (e) => {
    e.preventDefault()
    const AcceptableTypes = ['apartment', 'villa', 'penthouse', 'bungalow']

    if (!AcceptableTypes.includes(type)) {
      setTypeError(true)
      setTimeout(() => {
        setTypeError(false)
      }, 10 * 1000)
      return
    }

    try {
      const formData = new FormData()
      let filename = null

      if (img) {
        filename = Date.now() + img.name
        //for first img
        formData.append('filename', filename)
        formData.append('image', img)

        await fetch(`http://localhost:5000/upload/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: formData,
        })
      }

      // upload product and navigate to product
      const res = await fetch('http://localhost:5000/room', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          country,
          type,
          photo: filename,
          price,
          review,
        }),
      })
      const newRoom = await res.json()
      navigate(`/typeDetail/${newRoom?._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create room</h2>
        <form onSubmit={handleCreateRoom} encType='multipart/form-data'>
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              className={classes.input}
              placeholder='Title...'
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input
              type='text'
              onChange={(e) => setDesc(e.target.value)}
              className={classes.input}
              placeholder='Description...'
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Country: </label>
            <input
              type='text'
              onChange={(e) => setCountry(e.target.value)}
              className={classes.input}
              placeholder='Country...'
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Type: </label>
            <input
              type='text'
              onChange={(e) => setType(e.target.value)}
              className={classes.input}
              placeholder='Type...'
            />
          </div>
          <div className={classes.inputWrapperImgFirst}>
            <label className={classes.fileInputLabel} htmlFor='img'>
              Image: <span>Upload here</span>
            </label>
            <input
              type='file'
              filename='img'
              id='img'
              onChange={changeImg}
              style={{ display: 'none' }}
            />
            {img && (
              <p className={classes.imageName}>
                {img.name}{' '}
                <AiOutlineCloseCircle
                  onClick={() => handleCloseImg()}
                  className={classes.closeIcon}
                />
              </p>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price:</label>
            <input
              type='number'
              step={0.01}
              onChange={(e) => setPrice(e.target.value)}
              className={classes.input}
              placeholder='Price...'
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review:</label>
            <input
              type='number'
              min={1}
              max={5}
              step={0.1}
              onChange={(e) => setReview(e.target.value)}
              className={classes.input}
              placeholder='Review...'
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button className={classes.submitBtn} type='submit'>
              Create room
            </button>
          </div>
        </form>
        {typeError && (
          <div className={classes.errorMessage}>
            Wrong Type! Acceptable types are - apartment, villa, penthouse and
            bungalow
          </div>
        )}
      </div>
    </div>
  )
}

export default Create
