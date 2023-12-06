import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from '../DashboardPage/DashboardPage'
import HomePage from '../HomePage/HomePage'
import Weather from '../WeatherAPiCall/Weather'
import NavBar from '../NavBar/NavBar'
import BlogPosts from '../DashboardPage/BlogPosts'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/blog' element={<BlogPosts />} />
        </Routes>
      </BrowserRouter>
       
    </>
  )
}

export default App
