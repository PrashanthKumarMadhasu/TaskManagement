import React from 'react'
import './SplashScreen.css';
import { GoGoal } from "react-icons/go";

const SplashScreen = () => {
  return (
    <div className='intro'>
        <h1 className='logo-header-first'>Task</h1>
        <h1 className='logo-header-second'><GoGoal /></h1>
        <h1 className='logo-header-third'>Manager</h1>
    </div>
  )
}

export default SplashScreen