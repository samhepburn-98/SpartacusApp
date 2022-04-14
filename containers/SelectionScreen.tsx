import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Image, Spinner, Text, View } from "native-base";
import useSocket from "../hooks/useSocket";
import CameraRoll from "@react-native-community/cameraroll";
import { getBase64StringFromUri, getUri } from "../utils/images";
import { Socket } from "socket.io-client";
import GradientButton from "../components/GradientButton";

type SelectionScreenProps = {
    onContinue: Dispatch<SetStateAction<"selection" | "results">>;
    roomCode?: string;
    uri?: string;
    users?: string[];
}

const SelectionScreen = ({ onContinue, roomCode, uri, users }: SelectionScreenProps) => {
    const socket = useSocket();
    const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);

    const submitVote = (id: string) => {
        socket.emit("submitVote", id);
        setVoteSubmitted(true);
    };

    const allVotesReceived = () => {
        onContinue("results");
    };

    useEffect(() => {
        socket.on("requestImage", (imgPosition) => getImage(socket, imgPosition, roomCode));
        socket.on("allVotesReceived", () => allVotesReceived());
        return () => {
            socket.off("requestImage", (imgPosition) => getImage(socket, imgPosition, roomCode));
            socket.off("allVotesReceived", () => allVotesReceived());
        };
    }, [socket]);

    return (
        <View style={{ alignItems: "center" }}>
            <Image
                alt="alt"
                width="50%"
                height="50%"
                source={{ uri: uri }}/>
            {
                !uri &&
                <Spinner size="lg"/>
            }

            {
                !voteSubmitted &&
                users?.map((user) =>
                    <Box key={user} py={1}>
                        <GradientButton
                            onPress={() => submitVote(user)}
                            text={user}
                            width="50%"
                        />
                    </Box>
                )
            }

            {
                voteSubmitted &&
                <View>
                    <Text>Vote submitted</Text>
                    <Text>Waiting for rest of room to submit votes</Text>
                </View>
            }

        </View>
    );
};

const getImage = (socket: Socket, imgPosition: number, roomCode?: string) => {
    CameraRoll.getPhotos({ first: imgPosition, include: ["imageSize"] })
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
