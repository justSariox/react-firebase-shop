import {Register} from "../common/register";
import {Login} from "../common/login";
import {useEffect} from "react";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {authThunks} from "../features/auth/authSlice";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";


const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: AppRootStateType) => state.auth);
    const getData = () => {
        dispatch(authThunks.getMe())
    }

    console.log(user)
  return (
     <div>
       <Register/>
       <Login/>
         <button onClick={getData}>
             getInfo
         </button>
     </div>
  );
};

export default App;
