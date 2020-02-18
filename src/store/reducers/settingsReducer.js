const initialState = {
    addToListWhenRemovedFromFridge: false,
    removeFromListWhenAddedToFridge: false,
    apiCredits: undefined,
    lastUpdate: undefined
};

function saveSettings(state = initialState, action) {
    let nextState;
    switch (action.type) {
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
        case 'SET_API_CREDITS':
            nextState = {
                ...state,
                apiCredits: action.value,
                lastUpdate: new Date()
            };
            return nextState || state;
        case 'CLEAR_DATA':
            return initialState;
    }
    return state;
}

export default saveSettings;