
import Login from './Components/Login';
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {  

  return <BrowserRouter>
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
}

export default App
