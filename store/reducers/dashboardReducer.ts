import {
  INPUT_DATA,
  OUTPUT_DATA,
  INPUT_ERROR,
  MINIFY_CONFIG,
  FORMAT_CONFIG,
  SAVED_DATA,
  FILE_DATA,
} from "../constants/dashboardConstants";

const dashboardInitialState = {
  inputData: "",
  savedData: "",
  outputData: "",
  inputError: "",
  monacoConfig: {}
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
    case SAVED_DATA:
      return {
        ...state,
        savedData: payload,
      };
    case FILE_DATA:
      return {
        ...state,
        savedData: payload,
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
    default:
      return state;
  }
};
