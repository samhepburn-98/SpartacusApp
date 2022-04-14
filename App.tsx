import { NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Navigation from "./navigation/Navigation";
import { SocketProvider } from "./providers/SocketProvider";
import { theme } from "./theme/theme";
import { randomPropertyInObj } from "./utils/funcs";
import { GRADIENT_PAIRS } from "./assets/gradient-pairs";
import { ColorsProvider } from "./providers/ColorsProvider";


const App = () => {
    const isDarkMode = useColorScheme() === "dark";
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const randomColors: string[] = randomPropertyInObj(GRADIENT_PAIRS) as string[];

    return (
        <NativeBaseProvider theme={theme}>
            <ColorsProvider value={randomColors}>
                <SocketProvider>
                    <Navigation/>
                </SocketProvider>
            </ColorsProvider>
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
