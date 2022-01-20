import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../common/header';
import AdminMenu from './adminMenu';

const Admin = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
            </div>
            <div className='row mt-3'>
                <AdminMenu />
            </div>
        </div>
    )
}

export default Admin;