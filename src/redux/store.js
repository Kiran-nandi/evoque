import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer';

import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
//   blacklist: ['apiReducer', 'modalReducer'],
  // blacklist: ['apiProductSlice'],
}

export const rootReducers = combineReducers({
//   modalReducer : modalReducer,   
    userReducer : userReducer, 
//     apiReducer : apiReducer,
  // [apiSlice.reducerPath]: apiSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),

  
})

setupListeners(store.dispatch)

export { store };