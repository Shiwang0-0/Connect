import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Loader from './components/Layout/Loader.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

const LandingPage=lazy(()=>import("./pages/LandingPage.jsx"))

const App=()=>{
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
