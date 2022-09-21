import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './Component/NavBar'
import AddEditUser from './Pages/AddEditUser'
import Home from './Pages/Home'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App = () => {

  return (
    <div>
         <Router>
              <NavBar />
            <Routes>
              <Route path='/'element={ <Home/> } />
              <Route path='/add' element={ <AddEditUser />} />
              <Route path='/update/:id' element={<AddEditUser />} />
            </Routes>
        </Router>
        <ToastContainer />
    </div>
 
  )
}

export default App

