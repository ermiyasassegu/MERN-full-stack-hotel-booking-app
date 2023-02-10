import React from 'react'
import About from '../about/About'
import SuggestedPlaces from '../suggestedPlaces/SuggestedPlaces'
import Types from '../types/Types'
import classes from './home.module.css'

const Home = () => {
  return (
    <div>
      <About />
      <Types />
      <SuggestedPlaces />
    </div>
  )
}

export default Home
