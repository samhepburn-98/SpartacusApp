import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import UsersInRoom from "../components/UsersInRoom";
import useSocket from "../hooks/useSocket";

const CreateRoomScreen = () => {
    const socket = useSocket();
    const [roomCode, setRoomCode] = useState<string>();

    useEffect(() => {
        socket.emit("createRoom", setRoomCode);
        return () => {
            socket.emit("leaveRooms");
        };
    }, [socket]);

    return (
        <View>
            <Text>Create Room - I am {socket.id}</Text>
            <Text>{roomCode}</Text>
            <UsersInRoom roomCode={roomCode}/>
        </View>
    );
};

export default CreateRoomScreen;
