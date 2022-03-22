import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    return (
        <View>
            <Text>
                Home
            </Text>
            <Button
                title="Go to Create Room"
                onPress={() => navigation.navigate("CreateRoom")}
            />
            <Button
                title="Go to Join Room"
                onPress={() => navigation.navigate("JoinRoom")}
            />
        </View>
    );
};

export default HomeScreen;
