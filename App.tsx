import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Navigation from "./navigation/Navigation";
import { SocketProvider } from "./providers/SocketProvider";
import { theme } from "./theme/theme";
import useColors from "./hooks/useColors";
import { randomPropertyInObj } from "./utils/funcs";
import { GRADIENT_PAIRS } from "./assets/gradient-pairs";
import AsyncStorage from "@react-native-async-storage/async-storage";


const App = () => {
    const isDarkMode = useColorScheme() === "dark";
    const [colors, setStorageValue] = useColors();
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const clearStorage = async () => await AsyncStorage.clear();

    const randomColors: string[] = randomPropertyInObj(GRADIENT_PAIRS) as string[];

    useEffect(() => {
        try {
            console.log("d", colors);
            clearStorage().then();
            setStorageValue(randomColors).then();
        } catch (e) {
            // clear error
        }
    }, []);

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
