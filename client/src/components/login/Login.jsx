import React, { useState } from 'react'
import img1 from '../../assets/img7.jpg'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/authSlice'
import classes from './login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      dispatch(login(data))
      navigate('/')
    } catch (error) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 2500)
    }
  }
  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeftSide}>
          <img src={img1} alt='' className={classes.leftImg} />
        </div>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <input
              type='email'
              placeholder='Type email...'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Type password...'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.submitBtn}>Login</button>
            <p>
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credintials! try different ones
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
