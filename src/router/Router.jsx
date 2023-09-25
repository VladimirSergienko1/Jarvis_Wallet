import App from '../App.jsx'
import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";


const routes = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {path: '/login', element: <LoginPage />},
            { path: '/', element: <Navigate to="/login" replace /> },


        ]
    }
],{basename: '/'})

export default routes