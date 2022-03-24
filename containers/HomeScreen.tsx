import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { Button, Heading, useToast, VStack } from "native-base";
import { checkPhotoPermission, requestPhotoPermission, showPhotoPermissionToast } from "../utils/permissions";
import { RESULTS } from "react-native-permissions";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
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

    return (
        <VStack space={1} alignItems="center">
            <Heading mb="4">Spartacus</Heading>
            <Button
                isDisabled={!hasPhotoPermissions}
                onPress={() => navigation.navigate("CreateRoom")}
                shadow={2}
                width="50%"
            >
                Go to Create Room
            </Button>
            <Button
                isDisabled={!hasPhotoPermissions}
                onPress={() => navigation.navigate("JoinRoom")}
                shadow={2}
                width="50%"
            >
                Go to Join Room
            </Button>
        </VStack>
    );
};

export default HomeScreen;
