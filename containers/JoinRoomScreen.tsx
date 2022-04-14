import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { Text, VStack } from "native-base";
import { useForm } from "react-hook-form";
import useSocket from "../hooks/useSocket";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import CodeInput from "../components/CodeInput";
import GradientButton from "../components/GradientButton";

export type FormData = {
    roomCode: string;
};

type JoinRoomScreenProps = NativeStackScreenProps<RootStackParamList, "JoinRoom">;

const JoinRoomScreen = ({ navigation }: JoinRoomScreenProps) => {
    const socket = useSocket();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleJoinRoom = useCallback((data) => {
        if (errors !== {}) console.log("e", errors);
        socket.emit("joinRoom", data.roomCode, navigateToLobby);
    }, []);

    const navigateToLobby = (roomCode?: string) => {
        // roomCode is only returned if the room already exists
        if (roomCode) navigation.navigate("Lobby");
        else Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    };

    useEffect(() => {
        return () => {
            socket.emit("leaveRooms");
        };
    }, [socket]);

    return (
        <VStack space={1} alignItems="center">
            <Text>
                Join Room - I am {socket.id}
            </Text>
            <CodeInput control={control}/>
            {errors.roomCode?.types?.required && <Text>This is required.</Text>}
            {errors.roomCode?.types?.minLength && <Text>Please enter all 4 characters.</Text>}
            <GradientButton
                onPress={handleSubmit(handleJoinRoom)}
                text="Enter"
                width="50%"
            />
        </VStack>
    );
};

export default JoinRoomScreen;
