import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme } from "react-native";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"}/>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={backgroundStyle}>
                    <Header/>
                    Hello world
                </ScrollView>
            </SafeAreaView>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
    },
    highlight: {
        fontWeight: "700",
    },
});

export default App;
