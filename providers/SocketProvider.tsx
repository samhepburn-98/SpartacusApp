import React, { createContext, ReactChild, useContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
export const socket = io(SOCKET_URL);
export const SocketContext = createContext(socket);

interface ISocketProvider {
    children: ReactChild;
}

export const SocketProvider = (props: ISocketProvider) => {
    const socket = useContext(SocketContext);
    return (
        <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
    );
};
