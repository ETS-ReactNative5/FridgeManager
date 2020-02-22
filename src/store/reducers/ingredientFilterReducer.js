const initialState = {
  searchString: '',
  sortByName: true,
  sortByAisle: false
};

function saveFilters(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'SET_SEARCH_STRING':
      nextState = {
        ...state,
        searchString: action.value,
      };
      return nextState || state;
    case 'SORT_BY_AISLE':
      nextState = {
        ...state,
        sortByAisle: true,
        sortByName: false
      };
      return nextState || state;
    case 'SORT_BY_NAME':
      nextState = {
        ...state,
        sortByAisle: false,
        sortByName: true
      };
      return nextState || state;
    case 'CLEAR_FILTER':
      return initialState;
    default:
      return state
  }
}

export default saveFilters;
