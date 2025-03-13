import { useNavigate } from "react-router-dom";

export const Hero=()=>{
      const naviagte = useNavigate()
      const handleClick=()=>{
        naviagte("/chat")
      }

    return <div>
        <div className="flex-col w-full max-w-200 m-auto ">
        <div className="text-[35px] text-gray-300 leading-[1] text-center">
            <p >Welcome to <span className="hidden">WebSocket</span> <span className="inline-flex text-white">real-time</span><span className="hidden">interactive</span></p>
             Chat App used for seamless communication
        </div>
        <div className="flex justify-center mt-8">
        <button onClick={handleClick} className="px-20 font-medium text-lg rounded-lg py-3 bg-blue-600 flex hover:bg-blue-500 ">Let's Chat</button>
        </div>
        </div>
    </div>
}