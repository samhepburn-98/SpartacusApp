import React from "react";
import { useColorModeValue, useTheme, View } from "native-base";
import { SafeAreaView } from "react-native";

type FullHeightViewProps = {
    children: JSX.Element | JSX.Element[];
}

const FullHeightView = (props: FullHeightViewProps) => {
    const theme = useTheme();
    return (
        <SafeAreaView
            style={{ backgroundColor: useColorModeValue(theme.colors.light["100"], theme.colors.dark["100"]) }}>
            <View height="100%">{props.children}</View>
        </SafeAreaView>
    );
};

export default FullHeightView;
