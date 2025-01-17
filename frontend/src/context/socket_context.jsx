import { createContext, useEffect, useState , useContext } from "react";
import { useAuthContext } from "./user_context";
import io from "socket.io-client";

 const SocketContext = createContext();


export const useSocketContext = () => {
    return useContext(SocketContext);
;}


export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineusers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {

        if (authUser) {

            const socket = io("https://chat-app-t3x3.onrender.com" , {
                 query:{
                    userId: authUser._id 
                 }
            });

            setSocket(socket);

            socket.on("getOnlineUsers" , (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        } else {

            if (socket) {
                socket.close();
                setSocket(null);
            }
        }

    }, [authUser])

    return <SocketContext.Provider value={{socket , onlineusers}} >{children}</SocketContext.Provider>
}