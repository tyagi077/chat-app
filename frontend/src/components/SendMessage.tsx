interface messageProps{
    message:string
}
export const SendMessage = (props:messageProps) => {
    return <div className="flex justify-end mx-2 my-5">
        <div className="bg-blue-600 rounded-md text-white inline-flex items-center justify-center px-2 py-2 ">
            <p className="break-words max-w-100 min-w-4 ">
                {props.message}
            </p>
        </div>
    </div>
}