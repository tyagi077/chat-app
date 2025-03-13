
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { VisibleProvide } from './context/VisibleContext'
import { Home } from './pages/Home'
import { Main } from './components/Main'
import { Hero } from './components/Hero'
import { Chat } from './components/Chat'
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="">
       <VisibleProvide>
      <BrowserRouter>
      <Routes>
      <Route path="/" element ={<Home/>}>
       <Route index element ={<Hero/>}/>
       <Route path="chat" element ={<Main/>}/>
       <Route path="startchat" element ={<Chat/>}/>
       <Route path='*' element={<NotFound/>}/>
      </Route>
      
     </Routes>
     </BrowserRouter>
     </VisibleProvide>

     <ToastContainer 
     autoClose={1000}
     />
    </div>
  )
}

export default App
