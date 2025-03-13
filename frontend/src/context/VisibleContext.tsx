import { createContext, ReactNode, useState } from "react";

// Define the context type with `startBtn` and `setStartBtn`
interface VisibleContextType {
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  userId:string;
  setUserId:React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value of `undefined`
export const VisibleContext = createContext<VisibleContextType | undefined>(undefined);

interface VisibleProviderProps {
  children: ReactNode;
}

export function VisibleProvide({ children }: VisibleProviderProps) {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <VisibleContext.Provider value={{ roomId, setRoomId ,userId,setUserId }}>
      {children}
    </VisibleContext.Provider>
  );
}
