import React, {useState} from 'react';
import {authThunks} from "../features/auth/authSlice";
import {useAppDispatch} from "./hooks/useAppDispatch";

export const Login = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = () => {
        dispatch(authThunks.loginUser({email, password}))
    }

    return (
        <div style={{width: '400px'}}>
            <h1>Login</h1>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignIn} type="submit">Login</button>
            </form>
        </div>
    );
};

