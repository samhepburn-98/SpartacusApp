import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useColors = (): [string[], ((colors: string[]) => Promise<void>)] => {
    const [colors, setColors] = useState<string[]>();

    const setStorageValue = async (colors: string[]) => {
        try {
            console.log("p", colors);
            const jsonValue = JSON.stringify(colors);
            await AsyncStorage.removeItem("@colors");
            await AsyncStorage.setItem("@colors", jsonValue);
        } catch (e) {
            console.log(e);
        }
    };

    const getColors = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@colors");
            const colors = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log("l", colors);
            setColors(colors);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getColors().then();
    }, []);

    const fallBackColors: string[] = ["#ff0000", "#00ffff"];

    const returnColors: string[] = colors ?? fallBackColors;

    return [returnColors, setStorageValue];
};

export default useColors;
