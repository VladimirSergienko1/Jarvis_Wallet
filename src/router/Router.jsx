import App from '../App.jsx'
import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import Error404 from "../pages/Errors/Error404.jsx";
import Error403 from "../pages/Errors/Error403.jsx";


const routes = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {path: '/login', element: <LoginPage />},
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: '/error403', element: <Error403/>  },
            { path: "*", element: <Error404/> },


        ]
    }
],{basename: '/'})

export default routes