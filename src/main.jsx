import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import routes from "./router/Router.jsx";
import {RouterProvider} from "react-router-dom";

import '../i18n.js';
import {Provider} from "react-redux";
import {store} from "./store/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
                <RouterProvider router={routes} />
        </Provider>
)
