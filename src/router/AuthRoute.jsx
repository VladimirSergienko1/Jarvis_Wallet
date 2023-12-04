import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import Wallet from "../pages/WalletPage/Wallet.jsx";

const PrivateRoute = () => {
    const isAuth = !!Cookies.get('access_token');

    if (!isAuth) {
        return <Navigate to="/main/login" replace />;
    }

    return <Wallet />;
};

export default PrivateRoute;
