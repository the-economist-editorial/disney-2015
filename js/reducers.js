import { generateReducer } from './utilities.js';
import { UPDATE_DATA, UPDATE_FILTER } from './actions.js';

var initialState = {
  data : [],
  filter : 'all'
};

var dataReducer = generateReducer(initialState.data, UPDATE_DATA);
var filterReducer = generateReducer(initialState.filter, UPDATE_FILTER);

export default function updateState(state = initialState, action) {
  return {
    data : dataReducer(state.data, action),
    filter : filterReducer(state.filter, action)
  };
}
