import { createSlice } from '@reduxjs/toolkit';
import { ref, set, get } from "firebase/database";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getIdToken} from "firebase/auth";
import {auth, db} from "../../common/api/common.api";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {appActions} from "../../app/app.slice";

interface AuthState {
    isLoggedIn: boolean,
    isInitialize: boolean,
    userData: any
}

const initialState: AuthState = {
   isLoggedIn: false,
    isInitialize: false,
    userData: null
};

const registerUser = createAppAsyncThunk<{userId: string}, RegisterParamsType>(
    'auth/register',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: 'loading'}));
        try {
            const res = await createUserWithEmailAndPassword(auth, arg.email, arg.password);
            const user = res.user;
            const userData = {
                email: arg.email,
                name: arg.name,
                userId: user.uid,
                cart: {
                    cartProducts: [],
                    totalCount: 0,
                    totalPrice: 0
                },
                role: 'user'
            }
            const userRef = ref(db, `users/${user.uid}`);
            await set(userRef, userData);
            return {userId: user.uid}
        } catch (e) {
            return rejectWithValue(null);
        }
    }
)

const loginUser = createAppAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>(
    'auth/login',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            const res = await signInWithEmailAndPassword(auth, arg.email, arg.password);
            return { res, isLoggedIn: true};
        } catch (e) {
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppStatus({status: 'idle'}))
        }
    }
)

const logoutUser = createAppAsyncThunk<{isLoggedIn: boolean}, void>(
    'auth/logout',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            const res = await signOut(auth);
            return { isLoggedIn: false };
        } catch (e) {
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.setAppStatus({status: 'idle'}))
        }
    }
)

const getMe = createAppAsyncThunk<any, void>(
    'auth/getMe',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const user = auth.currentUser;
            if (user) {
                const id = user.uid
                const userRef = ref(db, `users/${id}`);
                const res = await get(userRef);
                const userData = res.val();
                return { userData };

            }
        } catch (e) {
            return rejectWithValue(null)
        }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMe.fulfilled, (state, action) => {
                state.userData = action.payload.userData;
            })

    },
});



type LoginParamsType = {
    email: string,
    password: string
}

type RegistersParamsType = LoginParamsType & {
    name: string
}

export const authReeducer = authSlice.reducer;
export const authThuunks = {loginUser, logoutUser, registerUser, getMe};