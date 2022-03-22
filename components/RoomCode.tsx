import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Socket } from "socket.io-client";

type RoomCodeProps = {
    socket: Socket
}

type RoomCodeResponse = {
    roomCode: string;
}

const RoomCode = ({ socket }: RoomCodeProps) => {
    const [roomCode, setRoomCode] = useState<string>();

    useEffect(() => {
        socket.on("roomCreated", (data: RoomCodeResponse) => {
            console.log("1", socket.id);
            console.log("2", data);
            setRoomCode(data.roomCode);
        });
    }, [socket, setRoomCode]);

    return (
        <Text>
            {roomCode}
        </Text>
    );
};

export default RoomCode;
