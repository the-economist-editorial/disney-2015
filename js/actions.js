export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CHANGE_TOOLTIP = 'CHANGE_TOOLTIP';

export function updateData(data) {
  return {
    type : UPDATE_DATA,
    data
  }
}

export function updateFilter(data) {
  return {
    type : UPDATE_FILTER,
    data
  };
}

export function showTooltip(contents) {
  return {
    type : CHANGE_TOOLTIP,
    show : true,
    contents
  };
}
export function hideTooltip() {
  return {
    type : CHANGE_TOOLTIP,
    show : false
  };
}
