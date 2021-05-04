import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#581845",
    secondary: "#900C3F",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: "#898C95",
};

export const SIZE = {
    //gloal Sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    //font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    //app dimensions
    width,
    height, 
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZE.largeTitle, lineHeight: 50},
    h1: { fontFamily: "Roboto-Bold", fontSize: SIZE.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZE.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZE.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZE.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZE.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZE.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZE.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZE.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZE.body5, lineHeight: 22 },
};

const appTheme = {COLORS, SIZE, FONTS};
export default appTheme;