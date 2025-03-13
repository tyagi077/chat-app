interface messageProps{
    message:string
}
export const ReceiveMessage=(props:messageProps)=>{
    return <div className="flex justify-start mx-2 my-5">
        <div className="bg-white rounded-md text-black inline-flex items-center justify-center px-2 py-2 ">
            <p className="break-words max-w-100 min-w-4">
                {props.message}
            </p>
         </div>
    </div>
}