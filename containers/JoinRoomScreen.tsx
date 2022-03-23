import React, { useCallback, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import useSocket from "../hooks/useSocket";

type FormData = {
    roomCode: string;
};

const JoinRoomScreen = () => {
    const socket = useSocket();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleJoinRoom = useCallback((data) => {
        socket.emit("joinRoom", data.roomCode);
        console.log(data);
    }, []);

    useEffect(() => {
        return () => {
            socket.emit("leaveRooms");
        };
    }, [socket]);

    return (
        <View>
            <Text>
                Join Room - I am {socket.id}
            </Text>
            <Controller
                control={control}
                name="roomCode"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                rules={{
                    required: true,
                }}
            />
            {errors.roomCode && <Text>This is required.</Text>}
            <Button
                onPress={handleSubmit(handleJoinRoom)}
                title="Enter"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default JoinRoomScreen;
