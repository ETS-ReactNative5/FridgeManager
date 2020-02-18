import { createStore } from 'redux';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import recipeReducer from './reducers/recipeReducer';
import settingsReducer from './reducers/settingsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, {recipeReducer, settingsReducer});

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);
