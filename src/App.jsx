
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

function App() {


  return (
    <>
      <Header/>
      <AuthListener/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddRoom />} />
      <Route path="/edit/:id" element={<EditRoom />} />
      <Route path="/view/:id" element={<ViewRoom />} />
      <Route path="/book" element={<BookRoom />} />
      <Route path="/sign-in" element={<SignIN />} />
     </Routes>
    </>
  )
}

export default App
