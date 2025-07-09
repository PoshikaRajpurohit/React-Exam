
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import AddRoom from './Components/AddRoom'
import Home from './Components/Home'
import EditRoom from './Components/EditRoom'
import ViewRoom from './Components/View'
import BookRoom from './Components/Book'
import SignIN from './Components/Sign-In '
import AuthListener from './Services/Auth'
import Payment from './Components/Payment'
import BookingSuccess from './Components/BookingSuccess'
import MyBookings from './Components/MyBookings'
import SignUP from './Components/Sign-Up'

function App() {


  return (
    <>
      <Header/>
      <AuthListener/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddRoom />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/edit/:id" element={<EditRoom />} />
      <Route path="/view/:id" element={<ViewRoom />} />
      <Route path="/booking-form" element={<BookRoom />} />
      <Route path="/book" element={<MyBookings />}/>
      <Route path="/sign-in" element={<SignIN />} />
      <Route path="/sign-up" element={<SignUP />} />
     </Routes>
    </>
  )
}

export default App
