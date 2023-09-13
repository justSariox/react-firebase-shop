import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, set, get } from "firebase/database";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../common/api/common.api";

interface AuthState {
    email: string;
    password: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    user: {
        email: string | null;
        name: string | null
        id: string | null
        cart: {
            cartProducts: Array<any> | null
            totalPrice: number | null
            totalCount: number | null
        }
    }
}

const initialState: AuthState = {
    email: '',
    password: '',
    status: 'idle',
    error: null,
    user: {
        email: '',
        name: '',
        id: '',
        cart: {
            cartProducts: [],
            totalPrice: 0,
            totalCount: 0
        }
    }
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            const userData = {
                email: data.email,
                name: '',
                uid: '',
                cart: {
                    cartProducts: [],
                    totalCount: 0,
                    totalPrice: 0
                }
            };
            const userRef = ref(db, `users/${user.uid}`);
            await set(userRef, userData);
            return user.uid;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

export const loginUser = createAsyncThunk<any, any>(
    'auth/loginUser',
    async (data: { email: string, password: string }, { rejectWithValue }) => {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        const userRef = ref(db, `users/${user.uid}`);
        await set(userRef, {email: data.email, name: '', uid: user.uid})
            return { email: data.email, id: user.uid }; // Возвращаем объект с данными пользователя

        } catch (e) {
        return rejectWithValue(null);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                console.log('Пользователь успешно зарегистрирован:', action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                console.error('Ошибка при регистрации пользовател��:', action.payload);
            });
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.user.email = action.payload.email;
                state.user.id = action.payload.id;
                state.user.cart = {
                        cartProducts: [],
                        totalCount: 0,
                        totalPrice: 0
                    }


                console.log('Пользователь успешно вошел:', action.payload);
            })
    },
});

export const authThunks = {registerUser, loginUser};
export const authReducer = authSlice.reducer;
export default authSlice.reducer;
