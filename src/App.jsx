import './fonts/stylesheet.css'

import './App.css'


import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {$isAuth, checkAuthFx, loginFx} from "./store/login_model.js";
import {useStore} from "effector-react";
import {checkAuth} from "./features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "./pages/MainLayout.jsx";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //del
    const test = useSelector((state) => state.user.userData);
    console.log('BLALAL',test)
    //
    useEffect(() => {
        dispatch(checkAuth()).then((action) => {
            if (action.type === 'user/checkAuth/fulfilled') {
                navigate('/wallet');
            }
        });
    }, [dispatch, navigate]);


  return (

    <>
        {/*<h1>{isAuth ?  'Authorized' : 'Unauthorized'}</h1>*/}
        <MainLayout/>
    </>
  )
}

export default App
