import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import UsersInRoom from "../components/UsersInRoom";
import useSocket from "../hooks/useSocket";

const CreateRoomScreen = () => {
    const socket = useSocket();
    const [roomCode, setRoomCode] = useState();

    useEffect(() => {
        socket.emit("createRoom", setRoomCode);
    }, [socket]);

    return (
        <View>
            <Text>Create Room</Text>
            <Text>{roomCode}</Text>
            <UsersInRoom/>
        </View>
    );
};

export default CreateRoomScreen;
