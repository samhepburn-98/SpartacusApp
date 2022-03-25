import React, { useEffect, useState } from "react";
import { Image, Text, View } from "native-base";
import useSocket from "../hooks/useSocket";
import CameraRoll from "@react-native-community/cameraroll";
import { getBase64StringFromUri, getUri } from "../utils/images";

const GameScreen = () => {
    const socket = useSocket();
    const [timer, setTimer] = useState<number>();
    const [base64Img, setBase64Img] = useState<string>();

    useEffect(() => {
        socket.emit("timer");
        CameraRoll.getPhotos({ first: 1, include: ["filename", "imageSize"] })
            .then(r => {
                getUri(r)
                    .then(async (uri) => {
                        const base64String = await getBase64StringFromUri(uri);
                        setBase64Img(base64String);
                        socket.emit("sendImage", base64Img);
                    });
            });
    }, [setBase64Img]);

    useEffect(() => {
        socket.on("timer", setTimer);
        return () => {
            socket.off("timer", setTimer);
        };
    }, [socket, setTimer]);

    return (
        <View>
            <Text>{timer}</Text>
            <Image
                alt="alt"
                width="50%"
                height="50%"
                source={{ uri: base64Img }}/>
            <Text>Hello world</Text>
        </View>
    );
};

export default GameScreen;
