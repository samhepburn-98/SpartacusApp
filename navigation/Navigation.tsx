import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../containers/HomeScreen";
import CreateRoomScreen from "../containers/CreateRoomScreen";
import JoinRoomScreen from "../containers/JoinRoomScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LobbyScreen from "../containers/LobbyScreen";
import GameScreen from "../containers/GameScreen";
import Header from "../components/Header";

export type RootStackParamList = {
    CreateRoom: undefined;
    Game: { roomCode?: string }; // TODO: Make this non nullable
    Home: undefined;
    JoinRoom: undefined;
    Lobby: undefined;
};

const Navigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ header: () => <Header/>, }}
                />
                <Stack.Screen
                    name="CreateRoom"
                    component={CreateRoomScreen}
                    options={{ header: () => <Header showBack/>, }}
                />
                <Stack.Screen
                    name="JoinRoom"
                    component={JoinRoomScreen}
                    options={{ header: () => <Header showBack/>, }}
                />
                <Stack.Screen
                    name="Lobby"
                    component={LobbyScreen}
                    options={{ header: () => <Header showBack/>, }}
                />
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={{ header: () => <Header showBack/>, }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default Navigation;
