const initialState = {
  addToListWhenRemovedFromFridge: false,
  removeFromListWhenAddedToFridge: false,
  fridge: [],
  list: []
};

function saveIngredients(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'ADD_TO_FRIDGE':
      nextState = {
        ...state,
        fridge: [...state.fridge, action.value],
        list: state.removeFromListWhenAddedToFridge ? state.list.filter(obj => obj.id !== action.value.id) : state.list
      };
      return nextState || state;
    case 'REMOVE_FROM_FRIDGE':
      nextState = {
        ...state,
        fridge: state.fridge.filter(obj => obj.id !== action.value.id),
        list: state.addToListWhenRemovedFromFridge ? [...state.list, action.value] : state.list
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
    case 'SWITCH_ADD_TO_LIST_WHEN_REMOVED_FROM_FRIDGE':
      nextState = {
        ...state,
        addToListWhenRemovedFromFridge: !state.addToListWhenRemovedFromFridge
      };
      return nextState || state;
    case 'SWITCH_REMOVE_FROM_LIST_WHEN_ADDED_TO_FRIDGE':
      nextState = {
        ...state,
        removeFromListWhenAddedToFridge: !state.removeFromListWhenAddedToFridge
      };
      return nextState || state;
    case 'CLEAR_DATA':
      return initialState;
    default:
      return state
  }
}

export default saveIngredients;
