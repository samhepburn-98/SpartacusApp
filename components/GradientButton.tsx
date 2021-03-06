import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { Button, View } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { ColorsContext } from "../providers/ColorsProvider";

type GradientButtonProps = {
    width?: number | string;
    isDisabled?: boolean;
    text: string;
    onPress: () => void;
};

const GradientButton = ({ isDisabled = false, onPress, text, width = "100%" }: GradientButtonProps) => {
    const colors = useContext(ColorsContext);

    return (
        <View style={{
            minHeight: 50,
            width: width
        }}>
            <MaskedView
                style={{ flex: 1, flexDirection: "row", height: "100%", alignSelf: "center" }}
                maskElement={
                    <View
                        style={{
                            // Transparent background because mask is based off alpha channel.
                            backgroundColor: "transparent",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="outline"
                            width="100%">
                            {text}
                        </Button>
                    </View>
                }
            >
                {/* Shows behind the mask, you can put anything here, such as an image */}
                <TouchableOpacity
                    disabled={isDisabled}
                    onPress={onPress}
                    style={{ flex: 1, height: "100%" }}
                >
                    <LinearGradient
                        colors={colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1, height: "100%",
                        }}
                    />
                </TouchableOpacity>
            </MaskedView>
        </View>
    );
};

export default GradientButton;
