import { useContext, useState } from "react";
import { VisibleContext } from "../context/VisibleContext";
import { useNavigate } from "react-router-dom";

export const Main=()=>{
    const context = useContext(VisibleContext);
    if(!context){
        throw new Error("Home")
      }

      const {setRoomId,setUserId}=context;

      const navigate = useNavigate();
      

    const handleClick=()=>{
        const generateRandomId = () => {
                return "user-" + Math.random().toString(36).substring(2, 9);
            };
            const currentUserId = generateRandomId();
            setUserId(currentUserId);
        
        if(inputValue!=""){

            setRoomId(inputValue.toUpperCase())
            navigate("/startchat")
        }
    }

    const [inputValue,setInputValue]=useState<string>("");

    const handleCreatebtn=()=>{
        const alpha = "ABCDEFGHIJKLMNOPQRSTVUVWXYZ"
        let ans ="";
        for(let i =1;i<=5;i++){
           ans+=alpha[Math.floor(Math.random()*alpha.length)]
        }
        setInputValue(ans)
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
    }
    return <div className=" w-full max-w-200">
      <div className=" flex-col">
      <div className="flex justify-center">
            <input onChange={(e)=>handleChange(e)} value={inputValue} maxLength={5} className="w-full max-w-130 rounded-md focus:outline-none border-2 focus:outline focus:border-blue-500 border-gray-300 py-2 px-2 focus:text-white " type="text" placeholder="Enter room ID (5 chars)" />
        </div>
        <div className="flex gap-6 mt-8 justify-center font-medium">
        <div className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md">
            <button onClick={handleClick} className="">Join Room</button>
        </div>
        <div onClick={handleCreatebtn} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md">
            <button>Create New Room</button>
        </div>
        </div>
      </div>
    </div>
}