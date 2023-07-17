import {
  INPUT_DATA,
  OUTPUT_DATA,
  INPUT_ERROR,
} from "../constants/dashboardConstants";

const dashboardInitialState = {
  inputData: "",
  outputData: "",
  inputError: "",
};

export const dashboardReducer = (
  state = dashboardInitialState,
  { type, payload }: any
) => {
  switch (type) {
    case INPUT_DATA:
      return {
        ...state,
        inputData: payload,
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
    default:
      return state;
  }
};
