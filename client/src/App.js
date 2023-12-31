import React from 'react'
import Registration from './Registration'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Registration/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
   </Router> 
  )
}

export default App