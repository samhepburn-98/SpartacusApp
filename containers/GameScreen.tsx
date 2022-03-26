import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import SelectionScreen from "./SelectionScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

type GameScreenProps = NativeStackScreenProps<RootStackParamList, "Game">;

const GameScreen = ({ route }: GameScreenProps) => {
    const socket = useSocket();
    const { roomCode } = route.params;
    const [base64Img, setBase64Img] = useState<string>();

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
        <SelectionScreen roomCode={roomCode} uri={base64Img}/>
    );
};

export default GameScreen;
