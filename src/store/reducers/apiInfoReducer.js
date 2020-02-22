import { format } from "date-fns";

const initialState = {
    apiCredits: undefined,
    lastUpdate: undefined
};

function saveApiInfo(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'SET_API_CREDITS':
            nextState = {
                ...state,
                apiCredits: action.value,
                lastUpdate: format(new Date(), 'MMMM d, K:mm a')
            };
            return nextState || state;
        case 'CLEAR_DATA':
            return initialState;
    }
    return state;
}

export default saveApiInfo;
