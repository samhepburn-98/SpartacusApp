import { Image, View } from "native-base";
import React, { useEffect } from "react";
import useSocket from "../hooks/useSocket";
import CameraRoll from "@react-native-community/cameraroll";
import { getBase64StringFromUri, getUri } from "../utils/images";
import { Socket } from "socket.io-client";

type SelectionScreenProps = {
    roomCode?: string;
    uri?: string;
}

const SelectionScreen = ({ roomCode, uri }: SelectionScreenProps) => {
    const socket = useSocket();

    useEffect(() => {
        socket.on("requestImage", (imgPosition) => getImage(socket, imgPosition, roomCode));
        return () => {
            socket.off("requestImage", (imgPosition) => getImage(socket, imgPosition, roomCode));
        };
    }, [socket]);

    return (
        <View>
            <Image
                alt="alt"
                width="50%"
                height="50%"
                source={{ uri: uri }}/>
        </View>
    );
};

const getImage = (socket: Socket, imgPosition: number, roomCode?: string) => {
    CameraRoll.getPhotos({ first: imgPosition, include: ["filename", "imageSize"] })
        .then(results => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const selectedImg = results.edges.pop()!;
            getUri(selectedImg)
                .then(async (uri) => {
                    const base64String = await getBase64StringFromUri(uri);
                    socket.emit("receiveImageFromSocket", roomCode, base64String);
                });
        });
};

export default SelectionScreen;
