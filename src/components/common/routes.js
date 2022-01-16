import React from 'react';
import Login from '../login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Assemblies from '../assemblies/assemblies';
import Admin from '../admin/admin';

export const AppRoute = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/assemblies' element={<Assemblies />} />
                    <Route path='/adminPanel' element={<Admin />} />
                    {/* <Route path='*' element={<NotFoundPage />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}
