import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "effector-react";
import {$isAuth, checkAuthFx} from "../store/login_model.js";
import {useEffect} from "react";
import Cookies from "js-cookie";

const PrivateRoute = ()=> {

    const isAuth = useStore($isAuth);
        console.log('PrivateRoute', isAuth);


    return isAuth ? <Outlet /> : <Navigate to="/login"/> ;
}

export default PrivateRoute