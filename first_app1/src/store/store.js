import {configureStore, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit'
import { itemsReducer, middlewareAlert } from '../slices/item'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/es/stateReconciler/hardSet'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'


const persistConfig = {
    key: 'root',
    version:1,
    storage,
    stateReconciler:hardSet
}

const rootReducer = combineReducers({items: itemsReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewareAlert),   
});



