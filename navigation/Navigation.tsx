import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../containers/HomeScreen";
import CreateRoomScreen from "../containers/CreateRoomScreen";
import JoinRoomScreen from "../containers/JoinRoomScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    CreateRoom: undefined;
    JoinRoom: undefined;
};

const Navigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="CreateRoom" component={CreateRoomScreen}/>
                <Stack.Screen name="JoinRoom" component={JoinRoomScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
