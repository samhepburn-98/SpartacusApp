import React from "react";
import { Text, View } from "react-native";
import { io } from "socket.io-client";
import RoomCode from "../components/RoomCode";
import UsersInRoom from "../components/UsersInRoom";

const CreateRoomScreen = () => {
    const socket = io("http://localhost:3000");
    socket.emit("createRoom");

    return (
        <View>
            <Text>Create Room</Text>
            <RoomCode socket={socket}/>
            <UsersInRoom/>
        </View>
    );
};

export default CreateRoomScreen;
