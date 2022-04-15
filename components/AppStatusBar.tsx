import React from "react";
import { StatusBar, useColorMode } from "native-base";

const AppStatusBar = () => {
    const {
        colorMode,
    } = useColorMode();

    return (
        <StatusBar
            animated
            barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
        />
    );
};

export default AppStatusBar;
