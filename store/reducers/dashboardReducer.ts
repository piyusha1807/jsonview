import {
  INPUT_DATA,
  OUTPUT_DATA,
  INPUT_ERROR,
  MINIFY_CONFIG,
  FORMAT_CONFIG,
  SAVED_FILE_DATA,
  SETTINGS_CONFIG,
} from "../constants/dashboardConstants";

const dashboardInitialState = {
  inputData: "",
  savedFileData: {},
  outputData: "",
  inputError: "",
  monacoConfig: {},
  settingsConfig: {}
};

export const dashboardReducer = (
  state = dashboardInitialState,
  { type, payload }: any
) => {
  switch (type) {
    case INPUT_DATA:
      localStorage.setItem("input-data", payload);
      return {
        ...state,
        inputData: payload,
      };
    case SAVED_FILE_DATA:
      return {
        ...state,
        savedFileData: {...payload},
      };
    case OUTPUT_DATA:
      return {
        ...state,
        outputData: payload,
      };
    case INPUT_ERROR:
      return {
        ...state,
        inputError: payload,
      };
    case MINIFY_CONFIG:
      return {
        ...state,
        monacoConfig: {
          wordWrap: "on",
          wrappingStrategy: "advanced",
        },
      };
    case FORMAT_CONFIG:
      return {
        ...state,
        monacoConfig: {
          wordWrap: "off",
          wrappingStrategy: "simple",
        },
      };
    case SETTINGS_CONFIG:
      return {
        ...state,
        settingsConfig: {
          ...payload
        },
      };
    default:
      return state;
  }
};
