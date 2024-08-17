import {
  createTheme,
  ThemeOptions,
  lighten,
  darken,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Poppins, Nunito_Sans } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#415f91",
      light: lighten("#415f91", 0.3),
      dark: darken("#415f91", 0.3),
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#565f71",
      light: lighten("#565f71", 0.3),
      dark: darken("#565f71", 0.3),
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#705575",
      light: lighten("#705575", 0.3),
      dark: darken("#705575", 0.3),
      contrastText: "#ffffff",
    },
    error: {
      main: "#ba1a1a",
      light: lighten("#ba1a1a", 0.3),
      dark: darken("#ba1a1a", 0.3),
      contrastText: "#ffffff",
    },
    primaryContainer: {
      main: "#d6e3ff",
      light: lighten("#d6e3ff", 0.3),
      dark: darken("#d6e3ff", 0.3),
      contrastText: "#001b3e",
    },
    secondaryContainer: {
      main: "#dae2f9",
      light: lighten("#dae2f9", 0.3),
      dark: darken("#dae2f9", 0.3),
      contrastText: "#131c2b",
    },
    tertiaryContainer: {
      main: "#fad8fd",
      light: lighten("#fad8fd", 0.3),
      dark: darken("#fad8fd", 0.3),
      contrastText: "#28132e",
    },
    errorContainer: {
      main: "#ffdad6",
      light: lighten("#ffdad6", 0.3),
      dark: darken("#ffdad6", 0.3),
      contrastText: "#410002",
    },
    surface: {
      main: "#f9f9ff",
      light: lighten("#f9f9ff", 0.3),
      dark: darken("#f9f9ff", 0.3),
      contrastText: "#191c20",
    },
    surfaceDim: {
      main: "#d9d9e0",
      light: lighten("#d9d9e0", 0.3),
      dark: darken("#d9d9e0", 0.3),
    },
    surfaceBright: {
      main: "#f9f9ff",
      light: lighten("#f9f9ff", 0.3),
      dark: darken("#f9f9ff", 0.3),
    },
    surfaceContainerLowest: {
      main: "#ffffff",
      light: lighten("#ffffff", 0.3),
      dark: darken("#ffffff", 0.3),
    },
    surfaceContainerLow: {
      main: "#f3f3fa",
      light: lighten("#f3f3fa", 0.3),
      dark: darken("#f3f3fa", 0.3),
    },
    surfaceContainer: {
      main: "#ededf4",
      light: lighten("#ededf4", 0.3),
      dark: darken("#ededf4", 0.3),
    },
    surfaceContainerHigh: {
      main: "#e7e8ee",
      light: lighten("#e7e8ee", 0.3),
      dark: darken("#e7e8ee", 0.3),
    },
    surfaceContainerHighest: {
      main: "#e2e2e9",
      light: lighten("#e2e2e9", 0.3),
      dark: darken("#e2e2e9", 0.3),
    },
    onSurface: {
      main: "#191c20",
      light: lighten("#191c20", 0.3),
      dark: darken("#191c20", 0.3),
    },
    onSurfaceVariant: {
      main: "#44474e",
      light: lighten("#44474e", 0.3),
      dark: darken("#44474e", 0.3),
    },
    outline: {
      main: "#74777f",
      light: lighten("#74777f", 0.3),
      dark: darken("#74777f", 0.3),
    },
    outlineVariant: {
      main: "#c4c6d0",
      light: lighten("#c4c6d0", 0.3),
      dark: darken("#c4c6d0", 0.3),
    },
    inverseSurface: {
      main: "#2e3036",
      light: lighten("#2e3036", 0.3),
      dark: darken("#2e3036", 0.3),
    },
    inverseOnSurface: {
      main: "#f0f0f7",
      light: lighten("#f0f0f7", 0.3),
      dark: darken("#f0f0f7", 0.3),
    },
    inversePrimary: {
      main: "#aac7ff",
      light: lighten("#aac7ff", 0.3),
      dark: darken("#aac7ff", 0.3),
    },
    scrim: {
      main: "#000000",
      light: lighten("#000000", 0.3),
      dark: darken("#000000", 0.3),
    },
    shadow: {
      main: "#000000",
      light: lighten("#000000", 0.3),
      dark: darken("#000000", 0.3),
    },
  },
  typography: {
    fontFamily: nunitoSans.style.fontFamily,
    h1: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h2: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h3: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h4: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h5: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    h6: {
      fontFamily: poppins.style.fontFamily,
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: poppins.style.fontFamily,
    },
    subtitle2: {
      fontFamily: poppins.style.fontFamily,
    },
    body1: {
      fontFamily: nunitoSans.style.fontFamily,
    },
    body2: {
      fontFamily: nunitoSans.style.fontFamily,
    },
    button: {
      fontFamily: nunitoSans.style.fontFamily,
      textTransform: "none",
    },
    caption: {
      fontFamily: nunitoSans.style.fontFamily,
    },
    overline: {
      fontFamily: nunitoSans.style.fontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f9f9ff",
          color: "#191c20",
        },
      },
    },
  },
};

const theme = responsiveFontSizes(createTheme(themeOptions));
export default theme;
