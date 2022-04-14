import { TouchableOpacity } from "react-native";
import { Icon, View } from "native-base";
import React from "react";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
    showBack?: boolean;
    showOptions?: boolean;
}
const Header = ({ showBack = false, showOptions = false }: HeaderProps) => {
    const navigation = useNavigation();

    const frame = useSafeAreaFrame();
    const insets = useSafeAreaInsets();
    const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: headerHeight,
                paddingTop: 50,
                paddingHorizontal: 20
            }}>
            { //TODO: This is kinda gross maybe implement a better way
                !showBack && <View/>
            }
            {
                showBack && <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon as={Feather} name="chevron-left" size="sm"/>
                </TouchableOpacity>
            }
            {
                !showOptions && <View/>
            }
            {
                showOptions && <TouchableOpacity
                    onPress={() => {
                        console.log("Right");
                    }}>
                    <Icon color="white" as={Feather} name="more-vertical" size="sm"/>
                </TouchableOpacity>
            }
        </View>
    );
};

export default Header;
