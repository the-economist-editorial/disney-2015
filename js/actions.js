export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_FILTER = 'UPDATE_FILTER';

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
