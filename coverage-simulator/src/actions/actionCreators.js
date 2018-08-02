import {
  EDIT_CONFIG_UPDATE,
  EDIT_CONFIG_SAVE,
  EDIT_CONFIG_CLEAR
} from "./actionTypes.js";

export function editConfigUpdate(config) {
  return {
    type: EDIT_CONFIG_UPDATE,
    config: config
  };
}
export function editConfigSave(config) {
  return {
    type: EDIT_CONFIG_SAVE,
    config: config
  };
}

export function editConfigClear(config) {
  return {
    type: EDIT_CONFIG_CLEAR,
    config: config
  };
}
