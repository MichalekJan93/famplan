import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Registration from './views/Registration';
import MainPage from './views/MainPage';
import Applications from './views/Application';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<MainPage />}/>
                <Route path="/signup" element={<Registration />}/>
                <Route path="/app" element={<Applications />}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Router;