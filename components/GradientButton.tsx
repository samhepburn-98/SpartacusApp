import React from "react";
import { TouchableOpacity } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { Button, View } from "native-base";
import { randomPropertyInObj } from "../utils/funcs";
import { GRADIENT_PAIRS } from "../assets/gradient-pairs";
import LinearGradient from "react-native-linear-gradient";

type GradientButtonProps = {
    isDisabled?: boolean;
    text: string;
    onPress: () => void;
};

const GradientButton = ({ isDisabled = false, onPress, text }: GradientButtonProps) => {
    const colors: string[] = randomPropertyInObj(GRADIENT_PAIRS) as string[];

    return (
        <View style={{
            height: 50,
            width: "50%"
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
                        <Button variant="outline">
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
