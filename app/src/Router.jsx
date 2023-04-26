import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Registration from './views/Registration';
import MainPage from './views/MainPage';
import Application from './views/Application';
import Login from './views/Login';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<MainPage />}/>
                <Route path="/signup" element={<Registration />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/app" element={<Application />}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Router;