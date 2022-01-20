import React, { useState } from 'react';
import Groupings from './groupings/groupings';
import Reports from './reports/reports';
import Users from './users/users';

const AdminMenu = () => {

    const [usersModule, setUsersModule] = useState('none');
    const [reportsModule, setReportsModule] = useState('none');
    const [groupingsModule, setGroupingModule] = useState('none');
    const [messageInitial, setMessageInitial] = useState('block');

    const showUsersModule = () => {
        setUsersModule('block');
        setReportsModule('none');
        setGroupingModule('none');
        setMessageInitial('none');
    }

    const showReportsModule = () => {
        setUsersModule('none');
        setReportsModule('block');
        setGroupingModule('none');
        setMessageInitial('none');
    }

    const showGroupingModule = () => {
        setUsersModule('none');
        setReportsModule('none');
        setGroupingModule('block');
        setMessageInitial('none');
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <button type='button' className='col-md-3 m-3 btn btn-success' onClick={showUsersModule}>Usuarios</button>
                <button type='button' className='col-md-3 m-3 btn btn-success' onClick={showGroupingModule}>Asambleas</button>
                <button type='button' className='col-md-3 m-3 btn btn-success' onClick={showReportsModule}>Reportes</button>
            </div>
            <div className='row'>
                <div style={{ display: usersModule }}><Users /></div>
                <div style={{ display: reportsModule }}><Reports /></div>
                <div style={{ display: groupingsModule }}><Groupings /></div>
                <div style={{ display: messageInitial }} className="alert alert-warning mt-5" role="alert">
                    Por favor seleccione un modulo
                </div>
            </div>
        </div >
    )
}

export default AdminMenu;