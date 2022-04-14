import { NativeBaseProvider } from "native-base";
import React from "react";
import Navigation from "./navigation/Navigation";
import { SocketProvider } from "./providers/SocketProvider";
import { theme } from "./theme/theme";
import { randomPropertyInObj } from "./utils/funcs";
import { GRADIENT_PAIRS } from "./assets/gradient-pairs";
import { ColorsProvider } from "./providers/ColorsProvider";


const App = () => {
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

export default App;
