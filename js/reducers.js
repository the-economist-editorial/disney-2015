import { generateReducer } from './utilities.js';
import { UPDATE_DATA, UPDATE_FILTER, CHANGE_TOOLTIP } from './actions.js';

var initialState = {
  data : [],
  filter : 'all',
  tooltipShow : false,
  tooltipContents : null
};

var dataReducer = generateReducer(initialState.data, UPDATE_DATA);
var filterReducer = generateReducer(initialState.filter, UPDATE_FILTER);

function tooltipShowReducer(state = initialState.tooltipShow, action) {
  if(action.type !== CHANGE_TOOLTIP) { return state; }
  return action.show;
}
function tooltipContentsReducer(state = initialState.tooltipContents, action) {
  if(action.type !== CHANGE_TOOLTIP) { return state; }
  if(action.contents) { return action.contents; }
  return null;
}

export default function updateState(state = initialState, action) {
  return {
    data : dataReducer(state.data, action),
    filter : filterReducer(state.filter, action),
    tooltipShow : tooltipShowReducer(state.tooltipShow, action),
    tooltipContents : tooltipContentsReducer(state.tooltipContents, action)
  };
}
