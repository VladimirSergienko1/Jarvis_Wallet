import App from '../App.jsx'
import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import Error404 from "../pages/Errors/Error404.jsx";
import Error403 from "../pages/Errors/Error403.jsx";
import RegistrationPage from "../pages/LoginPage/RegistrationPage.jsx";
import TelegramRegistration from "../pages/LoginPage/TelegramRegistration.jsx";
import PasswordRecovery from "../pages/LoginPage/PasswordRecovery.jsx";
import NoAccess from "../pages/LoginPage/NoAccess.jsx";
import Wallet from "../pages/WalletPage/Wallet.jsx";


const routes = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {path: '/login', element: <LoginPage />},
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: '/registration', element: <RegistrationPage/> },
            { path: '/telegram', element: <TelegramRegistration/> },
            { path: '/recovery', element: <PasswordRecovery/> },
            { path: '/ban', element: <NoAccess/> },
            { path: '/error403', element: <Error403/>  },

            { path: '/main', element: <Wallet/> },


            { path: "*", element: <Error404/> },


        ]
    }
],{basename: '/'})

export default routes