import React, { useEffect, useState } from "react";
import { Text, View } from "native-base";
import useSocket from "../hooks/useSocket";

type UsersInRoomProps = {
    roomCode?: string;
}

const UsersInRoom = ({ roomCode }: UsersInRoomProps) => {
    const socket = useSocket();
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        if (roomCode) socket.emit("getUsers", roomCode);
        socket.on("usersInRoom", setUsers);
        return () => {
            socket.off("usersInRoom", setUsers);
        };
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
