const initialState = {
  fridge: [],
  list: []
};

function saveIngredients(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'ADD_TO_FRIDGE':
      nextState = {
        ...state,
        fridge: [...state.fridge, action.value]
      };
      return nextState || state;
    case 'REMOVE_FROM_FRIDGE':
      nextState = {
        ...state,
        fridge: state.fridge.filter(obj => obj.id !== action.value.id)
      };
      return nextState || state;
    case 'ADD_TO_LIST':
      nextState = {
        ...state,
        list: [...state.list, action.value]
      };
      return nextState || state;
    case 'REMOVE_FROM_LIST':
      nextState = {
        ...state,
        list: state.list.filter(obj => obj.id !== action.value.id)
      };
      return nextState || state;
    case 'TRANSFER_FROM_LIST_TO_FRIDGE':
      nextState = {
        ...state,
        list: state.list.filter(obj => obj.id !== action.value.id),
        fridge: [...state.fridge, action.value]
      };
      return nextState || state;
    case 'TRANSFER_FROM_FRIDGE_TO_LIST':
      nextState = {
        ...state,
        list: [...state.list, action.value],
        fridge: state.fridge.filter(obj => obj.id !== action.value.id)
      };
      return nextState || state;
    case 'CLEAR_DATA':
      return initialState;
    default:
      return state
  }
}

export default saveIngredients;
