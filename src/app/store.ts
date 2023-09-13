import {AnyAction, combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {authReducer} from "../features/auth/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;