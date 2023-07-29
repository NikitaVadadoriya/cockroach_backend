import React from 'react'
import Registration from './Registration'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Login from './Login'
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Registration/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
   </Router> 
  )
}

export default App