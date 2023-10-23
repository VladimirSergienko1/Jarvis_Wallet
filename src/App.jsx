import './fonts/stylesheet.css'

import './App.css'


import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {$isAuth, checkAuthFx, loginFx} from "./store/login_model.js";
import {useStore} from "effector-react";
import {checkAuth} from "./features/login/loginSlice.js";
import {useDispatch} from "react-redux";

function App() {
    const isAuth = useStore($isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkAuth()).then((action) => {
            if (action.type === 'login/checkAuth/fulfilled') {
                navigate('/wallet');
            }
        });
    }, [dispatch, navigate]);


  return (

    <>
        {/*<h1>{isAuth ?  'Authorized' : 'Unauthorized'}</h1>*/}
        <Outlet />
    </>
  )
}

export default App
