import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#01497c",     // Light purple
    secondary: "#243B55",   // Dark purple

    white: "#fff",
    black: "#001219",
    green: "#40916c",
    red: "#d00000",
    gray: "#6A6A6A",
    lightGray: "#dbdbdb",
    lightGray1: "#f5f6fa"
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    h1: { fontFamily: "Verdana-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Verdana-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Verdana-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Verdana-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Verdana", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Verdana", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Verdana", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Verdana", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
