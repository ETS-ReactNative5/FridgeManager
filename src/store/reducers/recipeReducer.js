const initialState = { recipes: [] };

function saveRecipes(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'SAVE_RECIPE':
      nextState = {
        ...state,
        recipes: [...state.recipes, action.value]
      };
      return nextState || state;
    case 'UNSAVE_RECIPE':
      nextState = {
        ...state,
        recipes: state.recipes.filter(obj => obj.id !== action.value.id)
      };
      return nextState || state;
    case 'CLEAR_DATA':
      return initialState;
    default:
      return state
  }
}

export default saveRecipes;
