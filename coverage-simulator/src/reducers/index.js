import {
  EDIT_CONFIG_UPDATE,
  EDIT_CONFIG_SAVE,
  EDIT_CONFIG_CLEAR
} from "../actions/actionTypes";

const radioFreqOptions = [
  { label: "2.4 GHz", value: "2.4 GHz", unit: "GHz", num: 2.4 },
  { label: "5 GHz", value: "5 GHz", unit: "GHz", num: 5 }
];

const txPowerOptions = [
  { value: "4dBm", label: "High (4dBm)" },
  { value: "-6dBm", label: "Med (-6dBm)" },
  { value: "-16dBm", label: "Low (-16dBm)" }
];

const initialConfig = {
  txPower: txPowerOptions[0],
  radioFreq: radioFreqOptions[0]
};

const initialState = {
  currentConfig: initialConfig,
  editConfig: initialConfig,
  radioFreqOptions: radioFreqOptions,
  txPowerOptions: txPowerOptions
};

function coverageSimulatorApp(state = initialState, action) {
  switch (action.type) {
    case EDIT_CONFIG_UPDATE:
      console.log(action.type, { ...state, editConfig: action.config });
      return { ...state, editConfig: action.config };
    case EDIT_CONFIG_SAVE:
      console.log(action.type, {
        ...state,
        currentConfig: action.config
      });
      return { ...state, currentConfig: action.config };
    case EDIT_CONFIG_CLEAR:
      console.log(action.type, {
        ...state,
        editConfig: action.config
      });
      return { ...state, editConfig: action.config };
    default:
      return state;
  }
}

export default coverageSimulatorApp;
