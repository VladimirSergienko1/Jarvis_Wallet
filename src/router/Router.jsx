import App from '../App.jsx'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import Error404 from "../pages/Errors/Error404.jsx";
import Error403 from "../pages/Errors/Error403.jsx";
import RegistrationPage from "../pages/LoginPage/RegistrationPage.jsx";
import TelegramRegistration from "../pages/LoginPage/TelegramRegistration.jsx";
import PasswordRecovery from "../pages/LoginPage/PasswordRecovery.jsx";
import NoAccess from "../pages/LoginPage/NoAccess.jsx";
import Wallet from "../pages/WalletPage/Wallet.jsx";
import PrivateRoute from "./AuthRoute.jsx";
import Profile from "../components/Profile/Profile.jsx";
import AccountWalletView from "../components/Account/AccountWalletView.jsx";
import AccountModal from "../components/Account/AccountModal.jsx";
import IncomePage from "../pages/Accounting/Income/IncomePage.jsx";
import ExpensesPage from "../pages/Accounting/Expenses/ExpensesPage.jsx";


/*const routes = createBrowserRouter([

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
            {path: '/wallet',  element: (
                    <PrivateRoute>
                        <Wallet/>
                    </PrivateRoute>
                ),
                children: [
                    { path: 'account/:accountId', element: <AccountWalletView  /> },
                ]
            },
            { path: '/profile', element: <Profile/> },
            { path: '/error403', element: <Error403/>  },
            /!*{
                path: '/main',
                element: <PrivateRoute/>,
                children:[
                    {path: '/main/wallet', element: <Wallet/>}
                ]
            },*!/
            /!*{ path: '/main', element: <Wallet/> },*!/
            { path: "*", element: <Error404/> },
        ]
    }
],{basename: '/'})*/
const routes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/main/login" replace />, //FIXME
        errorElement: <Error403/>
    },
    {
        path: '/main',
        element: <App/>,
        errorElement: <Error403/>,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
                errorElement: <Error403/>
            },
            {
                path: 'registration',
                element: <RegistrationPage />,
                errorElement: <Error403/>
            },
            {
                path: 'telegram',
                element: <TelegramRegistration />,
                errorElement: <Error403/>
            },
            {
                path: 'recovery',
                element: <PasswordRecovery />,
                errorElement: <Error403/>
            },
            {
                path: 'ban',
                element: <NoAccess />,
                errorElement: <Error403/>
            },
            {
                path: '/main',
                element: (
                    <PrivateRoute>
                        <Wallet/>
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: 'account/:accountId',
                       /* element: <AccountWalletView />,*/ //FIXME
                        errorElement: <Error403/>
                    },
                    {
                        path: 'account/create',
                        /*element: <AccountModal />,*/ //FIXME
                        errorElement: <Error403/>
                    }
                ]
            },
            {
                path: 'profile',
                element: <Profile />,
                errorElement: <Error403/>
            },
            {
                path: "*",
                element: <Error404/>,
            }
        ]
    },
    {
        path: '/accounting', //FIXME
        element: <App/>,
        errorElement: <Error403/>,
        children: [
            {
                path: '/accounting',
                element: (
                    <PrivateRoute>
                        <Wallet/>
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: 'income',
                        /*element: <IncomePage />,*/ //FIXME
                        errorElement: <Error403/>
                    },
                    {
                        path: 'expenses',
                       /* element: <AccountModal />,*/ //FIXME
                        errorElement: <Error403/>
                    }
                ]
            },
        ]
    },


], { basename: '/' });


export default routes