import {
  SET_STATICFONT,
  SET_SPACING,
  SET_FONT,
  SET_FONTS,
  SET_BGCOLOR,
  SET_DIALOGS,
  SET_PRIMARY,
  SET_SECONDARY,
  SET_LOCKS,
  SET_MODE,
  SET_FONTLOADING,
  SET_SECONDARYMODE,
} from "./types";

const initialState = {
  staticFontLoaded: false,
  fonts: null,
  fontLoading: true,
  font: "",
  primary: "rgb(0,0,0)",
  secondaryMode: "complement",
  secondary: "rgb(255,255,255)",
  bgColor: false,
  mode: "light",
  spacing: 8,
  dialogs: {
    settings: false,
    themeCode: false,
  },
  locked: {
    fonts: false,
    palette: false,
  },
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_SPACING:
      return {
        ...state,
        spacing: action.payload,
      };
    case SET_STATICFONT:
      return {
        ...state,
        staticFontLoaded: action.payload,
      };
    case SET_SECONDARYMODE:
      return {
        ...state,
        secondaryMode: action.payload,
      };
    case SET_FONTLOADING:
      return {
        ...state,
        fontLoading: action.payload,
      };
    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case SET_LOCKS:
      return {
        ...state,
        locked: action.payload,
      };
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.payload,
      };
    case SET_BGCOLOR:
      return {
        ...state,
        bgColor: action.payload,
      };
    case SET_PRIMARY:
      return {
        ...state,
        primary: action.payload,
      };
    case SET_SECONDARY:
      return {
        ...state,
        secondary: action.payload,
      };
    case SET_FONTS:
      return {
        ...state,
        fonts: action.payload,
      };
    case SET_FONT:
      return {
        ...state,
        font: action.payload,
      };
    default:
      return state;
  }
};
