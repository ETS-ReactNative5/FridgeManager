import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import recipeReducer from './reducers/recipeReducer';
import apiInfoReducer from './reducers/apiInfoReducer';
import ingredientReducer from './reducers/ingredientReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, {recipeReducer, apiInfoReducer, ingredientReducer});

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);
