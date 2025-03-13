import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { VisibleContext } from "../context/VisibleContext";
import { SendMessage } from "./SendMessage";
import { ReceiveMessage } from "./ReceiveMessage";
import { toast } from "react-toastify";


export const Chat = () => {
    const context = useContext(VisibleContext);
    if (!context) {
        throw new Error("Home");
    }
    const { roomId } = context;

    const [messages, setMessages] = useState<Array<{ message: string; clientSent: boolean }>>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Generate or retrieve a persistent user ID
    const [currentUserId] = useState(() => {
        let storedId = localStorage.getItem("c_token");
        if (!storedId) {
            storedId = crypto.randomUUID();
            localStorage.setItem("c_token", storedId);
        }
        return storedId;
    });

    useEffect(() => {
        const ws = new WebSocket("wss://chat-app-q2gu.onrender.com");

        ws.onopen = () => {
            console.log("WebSocket connected");
            toast.success("connected")
            setSocket(ws);
            ws.send(
                JSON.stringify({
                    type: "join_room",
                    payload: { roomId, userId: currentUserId },
                })
            );
        };

        ws.onmessage = (event) => {

            try {
                const receivedMessage = JSON.parse(event.data);

                if (receivedMessage.type === "chat") {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { message: receivedMessage.message, clientSent: false },
                    ]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            console.log("Component unmounting, closing WebSocket...");
            ws.onmessage = null;
            ws.onclose = null;
            ws.close();
        };
    }, [roomId, currentUserId]); // Include `currentUserId` as a dependency

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
    };

    const handleClick = (e: FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() !== "" && socket) {
            const message = inputMessage.trim();
            socket.send(
                JSON.stringify({
                    type: "chat",
                    payload: { message, roomId, senderId: currentUserId },
                })
            );

            setMessages((prevMessages) => [
                ...prevMessages,
                { message, clientSent: true },
            ]);

            setInputMessage("");
        }
    };



    return (
        <div className="w-full max-w-120 mt-5">
            {socket?'':
                <div className="flex items-center gap-2 absolute top-6 right-6 z-2">
                    <div>Connecting</div>
                    <div className="w-2 h-2 bg-red-300 animate-spin"></div>
                </div>
            }

            <div className="border border-gray-100 text-center text-xl py-3 rounded-sm">
                <span>Room ID: </span><span className="text-blue-600">{roomId}</span>
            </div>

            <div className="rounded-sm border border-gray-100 overflow-y-scroll text-xl py-3 mt-5 h-90">
                {messages.map((message, index) =>
                    message.clientSent ? (
                        <SendMessage key={index} message={message.message} />
                    ) : (
                        <ReceiveMessage key={index} message={message.message} />
                    )
                )}
                <div ref={messagesEndRef}></div>
            </div>

            <div className="mt-4 w-full ">
                <form onSubmit={(e) => handleClick(e)} className=" w-full px-2 ">
                    <div className="w-full flex items-center gap-4">
                        <textarea
                            value={inputMessage}
                            onChange={handleChange}
                            placeholder="Type your message..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    handleClick(e);
                                }
                            }}
                            rows={1}
                            className="bg-white text-black w-full h-auto max-h-[70px] overflow-y-auto py-3   rounded-md px-3 focus:outline-none resize-none"
                        />

                        <div className="bg-blue-400 flex justify-center items-center gap-3 h-10 rounded-md font-medium cursor-pointer px-3">
                            <button className="cursor-pointer" type="submit">Send</button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    );
};
