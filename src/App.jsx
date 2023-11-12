import './fonts/stylesheet.css'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import Cookies from "js-cookie";
import {useStore} from "effector-react";
import {checkAuth} from "./features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "./pages/MainLayout.jsx";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userTheme = useSelector((state)=> state.user.userData?.style)
    console.log('userTheme',userTheme)
    //del
    const test = useSelector((state) => state.user.userData);
    console.log('BLALAL',test)
    //
    useEffect(() => {
        dispatch(checkAuth()).then((action) => {
            if (action.type === 'user/checkAuth/fulfilled') {
                if (location.pathname === '/login'){
                    navigate('/wallet');
                }
            }
        });
    }, [dispatch, navigate]);


  return (

    <div className={`app ${userTheme}`}>
        {/*<h1>{isAuth ?  'Authorized' : 'Unauthorized'}</h1>*/}
        <Suspense fallback={<div>Loading...</div>}>
            <MainLayout/>
        </Suspense>

    </div>
  )
}

export default App
