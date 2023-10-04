import './fonts/stylesheet.css'

import './App.css'


import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {$isAuth, checkAuthFx, loginFx} from "./store/login_model.js";
import {useStore} from "effector-react";

function App() {
    const isAuth = useStore($isAuth);

    useEffect(()=>{
        let token = Cookies.get('access_token')
        if(token){
            checkAuthFx();
        }
         console.log('UseEffect',isAuth)
    },[])

    console.log('isAuth', isAuth)

  return (

    <>
        {/*<h1>{isAuth ?  'Authorized' : 'Unauthorized'}</h1>*/}
        <Outlet />
    </>
  )
}

export default App
