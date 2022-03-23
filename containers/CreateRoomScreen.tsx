import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import UsersInRoom from "../components/UsersInRoom";
import useSocket from "../hooks/useSocket";
import { Button, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

type CreateRoomScreenProps = NativeStackScreenProps<RootStackParamList, "JoinRoom">;

const CreateRoomScreen = ({ navigation }: CreateRoomScreenProps) => {
    const socket = useSocket();
    const [roomCode, setRoomCode] = useState<string>();

    useEffect(() => {
        socket.emit("createRoom", setRoomCode);
        return () => {
            socket.emit("leaveRooms");
        };
    }, [socket]);

    return (
        <VStack space={1} alignItems="center">
            <Text>Create Room - I am {socket.id}</Text>
            <Text>{roomCode}</Text>
            <UsersInRoom roomCode={roomCode}/>
            <Button shadow={2}
                onPress={() => navigation.navigate("Game")}>
                Ready
            </Button>
        </VStack>
    );
};

export default CreateRoomScreen;
