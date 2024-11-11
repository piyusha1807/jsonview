import {
  INPUT_DATA,
  OUTPUT_DATA,
  INPUT_ERROR,
  MINIFY_CONFIG,
  FORMAT_CONFIG,
  SAVED_FILE_DATA,
  SETTINGS_CONFIG
} from '../constants/dashboardConstants';

export function setInputData(payload: any) {
  return {
    type: INPUT_DATA,
    payload
  };
}

export function setSavedFileData(payload: any) {
  return {
    type: SAVED_FILE_DATA,
    payload
  };
}

export function setOutputData(payload: any) {
  return {
    type: OUTPUT_DATA,
    payload
  };
}

export function setInputError(payload: any) {
  return {
    type: INPUT_ERROR,
    payload
  };
}

export function setMinifyConfig() {
  return {
    type: MINIFY_CONFIG
  };
}

export function setFormatConfig() {
  return {
    type: FORMAT_CONFIG
  };
}

export function setSettingsConfig(payload: any) {
  return {
    type: SETTINGS_CONFIG,
    payload
  };
}
