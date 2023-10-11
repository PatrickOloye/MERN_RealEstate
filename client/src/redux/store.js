import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { curryGetDefaultMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import  useReducer  from './user/userSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user : useReducer})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})


export const persistor = persistStore(store)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch