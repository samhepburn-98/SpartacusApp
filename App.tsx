import { NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Navigation from "./navigation/Navigation";
import { SocketProvider } from "./providers/SocketProvider";
import { theme } from "./theme/theme";


const App = () => {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NativeBaseProvider theme={theme}>
            <SocketProvider>
                <Navigation/>
            </SocketProvider>
        </NativeBaseProvider>
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
