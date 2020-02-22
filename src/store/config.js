import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import recipeReducer from './reducers/recipeReducer';
import apiInfoReducer from './reducers/apiInfoReducer';
import ingredientReducer from './reducers/ingredientReducer';
import ingredientFilterReducer from './reducers/ingredientFilterReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['ingredientFilterReducer']
};

const persistedReducer = persistCombineReducers(persistConfig, {recipeReducer, apiInfoReducer, ingredientReducer, ingredientFilterReducer});

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);
