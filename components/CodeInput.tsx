import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from "react-native-confirmation-code-field";
import { Control, Controller } from "react-hook-form";
import { FormData } from "../containers/JoinRoomScreen";

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

    return (
        <View>
            <Controller
                control={control}
                name="roomCode"
                render={({ field: { onChange, onBlur, value } }) => (
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="default"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
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
    );
};

export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const styles = StyleSheet.create({
    codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({ web: { lineHeight: 65 } }),
        fontSize: 30,
        textAlign: "center",
        borderRadius: CELL_BORDER_RADIUS,
        color: "#3759b8",
        backgroundColor: "#fff",

        // IOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    // =======================

    root: {
        minHeight: 800,
        padding: 20,
    },
    title: {
        paddingTop: 50,
        color: "#000",
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        paddingBottom: 40,
    },
    icon: {
        width: 217 / 2.4,
        height: 158 / 2.4,
        marginLeft: "auto",
        marginRight: "auto",
    },
    subTitle: {
        paddingTop: 30,
        color: "#000",
        textAlign: "center",
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 60,
        height: 60,
        backgroundColor: "#3557b7",
        justifyContent: "center",
        minWidth: 300,
        marginBottom: 100,
    },
    nextButtonText: {
        textAlign: "center",
        fontSize: 20,
        color: "#fff",
        fontWeight: "700",
    },
    focusCell: {
        borderColor: "#000",
    },
});

export default CodeInput;
