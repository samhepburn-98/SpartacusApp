import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { Fab, Icon, ITextProps, Text, useColorMode, useToast, VStack } from "native-base";
import { checkPhotoPermission, requestPhotoPermission, showPhotoPermissionToast } from "../utils/permissions";
import { RESULTS } from "react-native-permissions";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";
import GradientButton from "../components/GradientButton";
import { PixelRatio, StyleSheet } from "react-native";
import { ColorsContext } from "../providers/ColorsProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import FullHeightView from "../components/FullHeightView";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const colors = useContext(ColorsContext);

    const toast = useToast();
    const [hasPhotoPermissions, setHasPhotoPermissions] = useState<boolean>(false);
    useEffect(() => {
        checkPhotoPermission()
            .then(result => {
                if (result === RESULTS.GRANTED) setHasPhotoPermissions(true);
                else requestPhotoPermission()
                    .then(result => showPhotoPermissionToast(result, toast));
            });
    }, []);

    const GradientText = (props: JSX.IntrinsicAttributes & ITextProps & React.RefAttributes<unknown>) => {
        return (
            <MaskedView maskElement={<Text {...props} />}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text {...props} style={[props.style, { opacity: 0 }]}/>
                </LinearGradient>
            </MaskedView>
        );
    };

    const {
        colorMode,
        toggleColorMode
    } = useColorMode();

    const test = () => {
        toggleColorMode();
        console.log(colorMode);
    };

    return (
        <FullHeightView>
            <VStack space={1} alignItems="center">
                <GradientText style={styles.test}>Spartacus</GradientText>
                <GradientButton
                    isDisabled={!hasPhotoPermissions}
                    onPress={() => navigation.navigate("CreateRoom")}
                    text="Create Room"
                    width="50%"
                />
                <GradientButton
                    isDisabled={!hasPhotoPermissions}
                    onPress={() => navigation.navigate("JoinRoom")}
                    text="Join Room"
                    width="50%"
                />
            </VStack>
            <Fab
                icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}
                onPress={() => {
                    test();
                }}
                renderInPortal={false}
                shadow={2}
                size="sm"
            />
        </FullHeightView>
    );
};

const styles = StyleSheet.create({
    test: {
        paddingTop: 40,
        paddingBottom: 20,
        fontFamily: "MontserratAlternates-Regular",
        fontSize: 40 * PixelRatio.getFontScale(),
    }
});

export default HomeScreen;
