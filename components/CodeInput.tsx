import React, { useContext, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { ColorsContext } from "../providers/ColorsProvider";
import { FormData } from "../containers/JoinRoomScreen";
import { ColorMode, useColorMode } from "native-base";
import { theme } from "../theme/theme";

const CELL_COUNT = 4;

type CodeInputProps = {
    control: Control<FormData>;
}
const CodeInput = ({ control }: CodeInputProps) => {
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const { colorMode } = useColorMode();
    const styles = makeStyles(colorMode);

    return (
        <SafeAreaView style={styles.root}>
            <View>
                <Controller
                    control={control}
                    name="roomCode"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="default"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                    onLayout={getCellOnLayoutHandler(index)}
                                    key={index}
                                    style={[
                                        styles.cellRoot,
                                        isFocused && styles.focusCell,
                                        getIndexGradient(index),
                                    ]}
                                >
                                    <Text style={styles.cellText}>
                                        {symbol || (isFocused ? <Cursor/> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                    )}
                    rules={{
                        minLength: CELL_COUNT,
                        maxLength: CELL_COUNT,
                        required: true
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const getIndexGradient = (index: number) => {
    const colors = useContext(ColorsContext);
    return {
        borderBottomColor: colors[index],
        fontFamily: "MontserratAlternates-Regular",
    };
};

const makeStyles = (colorMode: ColorMode) => StyleSheet.create({
    root: {
        padding: 20
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 280,
        marginLeft: "auto",
        marginRight: "auto",
    },
    cellRoot: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.5,
    },
    cellText: {
        color: colorMode === "light"
            ? theme.colors.dark["200"]
            : theme.colors.light["200"],
        fontSize: 32,
        textAlign: "center",
        fontFamily: "MontserratAlternates-Regular",
    },
    focusCell: {
        borderBottomColor: "#007AFF",
        borderBottomWidth: 2,
    },
});

export default CodeInput;
