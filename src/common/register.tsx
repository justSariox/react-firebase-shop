import {useEffect, useState} from "react";
import { auth, db } from "./api/common.api";
import { ref, set, get } from "firebase/database";
import {authThunks} from "../features/auth/authSlice";
import {useAppDispatch} from "./hooks/useAppDispatch";

export const Register = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [categories, setCategories] = useState();

    useEffect(() => {
        const getProductCategory = async () => {
            const productCategory = await ref(db, 'categories')
            const category: any = get(productCategory)
                .then(data => console.log(data.val()))
            setCategories(category)
        }

        getProductCategory()
    }, [])

    // const getUser = async () => {
    //
    //                 const userRef = ref(db, `users/${user?.uid}`);
    //                 get(userRef)
    //                   .then((snapshot) => {
    //                         if (snapshot.exists()) {
    //                             const data = snapshot.val();
    //                             console.log(data);
    //                         }
    //                     })
    //                   .catch((error) => {
    //                         console.error('Error getting user data:', error);
    //                     });
    //
    //         }


    const handleRegister = () => {
                dispatch(authThunks.registerUser({email, password, name}))
    }

    return (
        <div style={{ width: '400px' }}>
            <div>
                <h1>Register</h1>
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
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleRegister} type="submit">Register</button>
                </form>
            </div>

        </div>
    )
}
