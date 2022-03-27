import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { Button, ITextProps, Text, useToast, VStack } from "native-base";
import { checkPhotoPermission, requestPhotoPermission, showPhotoPermissionToast } from "../utils/permissions";
import { RESULTS } from "react-native-permissions";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";
import { randomPropertyInObj } from "../utils/funcs";
import { GRADIENT_PAIRS } from "../assets/gradient-pairs";
import GradientButton from "../components/GradientButton";
import { PixelRatio, StyleSheet } from "react-native";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const toast = useToast();
    const [hasPhotoPermissions, setHasPhotoPermissions] = useState<boolean>(false);
    const colors: string[] = randomPropertyInObj(GRADIENT_PAIRS) as string[];
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

    return (
        <VStack space={1} alignItems="center">
            <GradientText style={styles.test}>Spartacus</GradientText>
            <Button
                isDisabled={!hasPhotoPermissions}
                onPress={() => navigation.navigate("CreateRoom")}
                shadow={2}
                colorScheme="primary"
                variant="outline"
                width="50%"
            >
                Go to Create Room
            </Button>
            <Button
                isDisabled={!hasPhotoPermissions}
                onPress={() => navigation.navigate("JoinRoom")}
                shadow={2}
                variant="outline"
                width="50%"
            >
                Go to Join Room
            </Button>
            <Text color="primary.50">Hello world</Text>
            <GradientButton
                isDisabled={!hasPhotoPermissions}
                onPress={() => navigation.navigate("JoinRoom")}
                text="Go to Create Room"/>
            <GradientButton
                isDisabled={!hasPhotoPermissions}
                onPress={() => navigation.navigate("CreateRoom")}
                text="Go to Join Room"/>
        </VStack>
    );
};

const styles = StyleSheet.create({
    test: {
        paddingTop: 40,
        paddingBottom: 20,
        fontFamily: "MontserratAlternates-Regular",
        fontSize: 40 * PixelRatio.getFontScale(),
    },
    testvg: {
        backgroundColor: "grey"
    }
});

export default HomeScreen;
