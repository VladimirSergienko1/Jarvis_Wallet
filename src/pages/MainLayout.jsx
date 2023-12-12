import React from 'react';
import {Outlet} from "react-router-dom";
import Wallet from "./WalletPage/Wallet.jsx";

const MainLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;