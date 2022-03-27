import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import SelectionScreen from "./SelectionScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { View } from "native-base";
import ResultsScreen from "./ResultsScreen";

type GameScreenProps = NativeStackScreenProps<RootStackParamList, "Game">;

const GameScreen = ({ route }: GameScreenProps) => {
    const socket = useSocket();
    const { roomCode } = route.params;
    const [base64Img, setBase64Img] = useState<string>();
    const [users, setUsers] = useState<string[]>([]);
    const [screen, setScreen] = useState<"selection" | "results">("selection");

    useEffect(() => {
        if (roomCode) socket.emit("getUsers", roomCode);
        socket.on("usersInRoom", setUsers);
        return () => {
            socket.on("usersInRoom", setUsers);
        };
    }, [socket, roomCode, setUsers]);

    useEffect(() => {
        socket.on("sendImageToRoom", (image) => {
            setBase64Img(image);
        });

        return () => {
            socket.off("sendImageToRoom", (image) => {
                setBase64Img(image);
            });
        };
    }, [socket]);

    return (
        <View>
            {
                screen === "selection" &&
                <SelectionScreen
                    onContinue={setScreen}
                    roomCode={roomCode}
                    uri={base64Img}
                    users={users}
                />
            }
            {
                screen === "results" &&
                <ResultsScreen
                    onContinue={setScreen}
                />
            }
        </View>
    );
};
export default GameScreen;
