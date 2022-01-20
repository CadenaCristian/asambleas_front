import React, { useState, useEffect } from 'react';
import { getAllusers } from '../../../axios/usersPetition';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {

    const [users, setUsers] = useState([]);

    const listUsers = async () => {
        const resp = await getAllusers();
        setUsers(resp);
        console.log("users: ", users.data);
    }


    useEffect(() => {
        listUsers();
    }, [])

    return (
        <div className='container-fluid' style={{ height: '70vh', overflow: 'auto' }}>
            <button className='btn btn-outline-primary col-md-12'> Añadir un nuevo usuario</button>
            {
                users === [] ?
                    <div className='row'>
                        <div className="alert alert-warning col-md-2" role="alert">
                            No hay usuarios por el momento!
                        </div>
                    </div>
                    :
                    <div className='row'>
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>¿Puede vota?</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data?.map((dat, index) =>
                                    <tr key={index}>
                                        <td>{dat.name}</td>
                                        <td>{dat.email}</td>
                                        <td>{dat.rol}</td>
                                        <td>{dat.vote === true ? "SI" : "NO"}</td>
                                        <td>
                                            <button className='btn btn-warning col-md-6'>Edit</button>
                                            <button className='btn btn-danger col-md-6'>Delete</button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default Users;