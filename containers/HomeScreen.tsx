import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { Button, Heading, VStack } from "native-base";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    return (
        <VStack space={1} alignItems="center">
            <Heading mb="4">Spartacus</Heading>
            <Button shadow={2}
                onPress={() => navigation.navigate("CreateRoom")}>
                Go to Create Room
            </Button>
            <Button shadow={2}
                onPress={() => navigation.navigate("JoinRoom")}>
                Go to Join Room
            </Button>
        </VStack>
    );
};

export default HomeScreen;
