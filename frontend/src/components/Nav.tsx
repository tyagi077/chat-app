import { Link } from "react-router-dom"

export const Nav=()=>{
    return <div className="">
        <div className="py-5 border border-white w-full max-w-150 rounded-lg m-auto">
        <ul className="flex gap-6 justify-center font-medium">
            <li className="cursor-pointer hover:text-blue-600"><Link to="/">Home</Link></li>
            <li>Real-Time App</li>
        </ul>
        </div>
    </div>
}