import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useSocket from "../hooks/useSocket";

type UsersInRoom = {
    roomCode?: string;
}

const UsersInRoom = ({ roomCode }: UsersInRoom) => {
    const socket = useSocket();
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        if (roomCode) socket.emit("getUsers", roomCode, setUsers);
    }, [socket, roomCode, setUsers]);

    return (
        <View>
            <Text>Users in room:</Text>
            {users?.map((user) => (
                <Text key={user}>{user}</Text>
            ))}
        </View>
    );
};

export default UsersInRoom;
