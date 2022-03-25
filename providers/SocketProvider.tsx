import React, { createContext, ReactChild, useContext } from "react";
import { io } from "socket.io-client";
import { Platform } from "react-native";

const SOCKET_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://127.0.0.1:3000";
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
