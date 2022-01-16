import React, { useState, useEffect } from 'react';
import { getAllusers } from '../../../axios/usersPetition';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {

    const [users, setUsers] = useState([]);

    const listUsers = async () => {
        const resp = await getAllusers();
        setUsers(resp);
    }
    console.log("users: ", users.data);


    useEffect(() => {
        listUsers();
    }, [])

    return (
        <div className='container-fluid'>
            {
                users === [] ?
                    <div className="alert alert-warning" role="alert">
                        No hay usuarios por el momento!
                    </div>
                    :
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>¿Puede vota?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default Users;