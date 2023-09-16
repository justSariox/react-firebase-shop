import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
          state.isInitialized = action.payload.isInitialized
        }
    }
})

type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const appActions = slice.actions
export const appReducer = slice.reducer