import { extendTheme } from "native-base";

export const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: "#E3F2F9",
            100: "#C5E4F3",
            200: "#A2D4EC",
            300: "#7AC1E4",
            400: "#47A9DA",
            500: "#0088CC",
            600: "#007AB8",
            700: "#006BA1",
            800: "#005885",
            900: "#003F5E",
        },
        // Redefining only one shade, rest of the color will remain same.
        amber: {
            400: "#d97706",
        },
    },
    components: {
        Button: {
            baseStyle: {
                rounded: "sm",
                fontFamily: "MontserratAlternates-Regular",
                fontWeight: "normal",
            },
        },
    },
    config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: "light",
    },
    fontConfig: {
        MontserratAlternates: {
            500: {
                normal: "MontserratAlternates-Regular",
            }
        }
    },
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: "MontserratAlternates",
        body: "MontserratAlternates",
        mono: "MontserratAlternates",
    },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
    type ICustomTheme = CustomThemeType
}
