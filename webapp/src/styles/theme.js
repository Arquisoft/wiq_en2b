import { extendTheme } from "@chakra-ui/react";
import '@fontsource-variable/outfit'; // Supports weights 100-900

const theme = extendTheme({
    fonts: {
        heading: "Outfit Variable, sans-serif",
    },
    fontWeights: {
        bold: 900,
    },
    colors: {
        moonstone: { // blue
            DEFAULT: '#64b1b9', 
            100: '#122527', 
            200: '#234a4f', 
            300: '#357076', 
            400: '#47959e', 
            500: '#64b1b9', 
            600: '#83c1c7', 
            700: '#a2d0d5', 
            800: '#c1e0e3', 
            900: '#e0eff1' 
        }, 
        raw_umber: { // brown
            DEFAULT: '#955e42', 
            100: '#1e130d', 
            200: '#3c251a', 
            300: '#593827', 
            400: '#774b34', 
            500: '#955e42', 
            600: '#b7795b', 
            700: '#c99b84', 
            800: '#dbbcad', 
            900: '#edded6' 
        }, 
        forest_green: { // dark green
            DEFAULT: '#248232', 
            100: '#071a0a', 
            200: '#0e3514', 
            300: '#164f1e', 
            400: '#1d6a28', 
            500: '#248232', 
            600: '#33ba47', 
            700: '#5ed370', 
            800: '#94e29f', 
            900: '#c9f0cf' 
        }, 
        pigment_green: { // green
            DEFAULT: '#2ba84a', 
            100: '#09210f', 
            200: '#11421d', 
            300: '#1a642c', 
            400: '#22853b', 
            500: '#2ba84a', 
            600: '#40ce63', 
            700: '#6fda8a', 
            800: '#9fe6b1', 
            900: '#cff3d8' 
        }, 
        beige: {
            DEFAULT: '#eef5db', 
            100: '#3b4914', 
            200: '#769228', 
            300: '#aacd49', 
            400: '#cce192', 
            500: '#eef5db', 
            600: '#f2f7e2', 
            700: '#f5f9e9', 
            800: '#f8fbf1', 
            900: '#fcfdf8' 
        },
    },
});
export default theme;