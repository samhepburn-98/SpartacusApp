import React, { useEffect, useState } from "react";
import UsersInRoom from "../components/UsersInRoom";
import useSocket from "../hooks/useSocket";
import { Text, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import GradientButton from "../components/GradientButton";
import FullHeightView from "../components/FullHeightView";

type CreateRoomScreenProps = NativeStackScreenProps<RootStackParamList, "JoinRoom">;

const CreateRoomScreen = ({ navigation }: CreateRoomScreenProps) => {
    const socket = useSocket();
    const [roomCode, setRoomCode] = useState<string>();

    const onReady = () => {
        socket.emit("readyToStart", roomCode);
        navigation.navigate("Game", { roomCode: roomCode });
    };

    useEffect(() => {
        socket.emit("createRoom", setRoomCode);
        return () => {
            socket.emit("leaveRooms");
        };
    }, []);

    return (
        <FullHeightView>
            <VStack space={1} alignItems="center">
                <Text>Create Room - I am {socket.id}</Text>
                <Text>{roomCode}</Text>
                <UsersInRoom roomCode={roomCode}/>
                <GradientButton
                    onPress={onReady}
                    text="Ready"
                    width="50%"
                />
            </VStack>
        </FullHeightView>
    );
};

export default CreateRoomScreen;
