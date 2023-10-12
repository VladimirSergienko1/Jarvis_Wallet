import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import routes from "./router/Router.jsx";
import {RouterProvider} from "react-router-dom";

import '../i18n.js';
import {Provider} from "react-redux";
import {login_store} from "./store/login_store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={login_store}>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={routes} />
            </Suspense>
        </Provider>
    </React.StrictMode>,
)
