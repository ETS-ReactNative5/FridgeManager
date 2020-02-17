import { createStore } from 'redux';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import recipeReducer from './reducers/recipeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, {recipeReducer});

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);
