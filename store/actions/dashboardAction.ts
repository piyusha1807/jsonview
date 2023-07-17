import {
  INPUT_DATA,
  OUTPUT_DATA,
  INPUT_ERROR,
} from "../constants/dashboardConstants";

export function setInputData(payload: any) {
  return {
    type: INPUT_DATA,
    payload,
  };
}

export function setOutputData(payload: any) {
  return {
    type: OUTPUT_DATA,
    payload,
  };
}

export function setInputError(payload: any) {
  return {
    type: INPUT_ERROR,
    payload,
  };
}