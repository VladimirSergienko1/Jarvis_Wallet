import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import routes from "./router/Router.jsx";
import {RouterProvider} from "react-router-dom";

import '../i18n.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={routes} />
        </Suspense>
    </React.StrictMode>,
)
