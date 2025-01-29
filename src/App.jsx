import { useState } from 'react'
import './App.css'
import ContactUs from './ContactUs'
import HowItWorks from './HowItWorks'
import Home from './Home'
import Home2 from './Home2'
import Home3 from './Home3'
import Home4 from './Home4'
import MlModelip from './MlModelip'
import Login from './Login'
// import SignUp from './SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
      <Home2 />
      <Home3 />
       <Home4 />
      <HowItWorks />
      <MlModelip/>
      <ContactUs />
      <Login/>
      {/* <SignUp/> */}

    </>
  )
}

export default App  
