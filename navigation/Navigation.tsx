import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../containers/HomeScreen";
import CreateRoomScreen from "../containers/CreateRoomScreen";
import JoinRoomScreen from "../containers/JoinRoomScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LobbyScreen from "../containers/LobbyScreen";
import GameScreen from "../containers/GameScreen";

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
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="CreateRoom" component={CreateRoomScreen}/>
                <Stack.Screen name="JoinRoom" component={JoinRoomScreen}/>
                <Stack.Screen name="Lobby" component={LobbyScreen}/>
                <Stack.Screen name="Game" component={GameScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
