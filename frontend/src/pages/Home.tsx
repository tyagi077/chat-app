import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Nav } from "../components/Nav"

export const Home=()=>{
    return <div className="flex flex-col h-screen">
      <div className="mt-5"><Nav/></div>
     <div className="flex-grow items-center flex justify-center">
      <Outlet/>
     </div>
      <div className=""><Footer/></div>
    </div>
}

