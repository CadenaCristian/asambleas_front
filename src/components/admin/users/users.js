import React, { useState, useEffect } from 'react';
import { getAllusers } from '../../../axios/usersPetition';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllGroups } from '../../../axios/groupsPetition';

const Users = () => {

    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [dropDownFilter, setDropDownFilter] = useState("Seleccione una agrupación")
    const [dropDownAddUser, setDropDownAddUser] = useState("Seleccione una agrupación")

    const listUsers = async () => {
        const resp = await getAllusers();
        setUsers(resp);
    }

    const listGroups = async () => {
        const resp = await GetAllGroups();
        console.log("2listGroups: ", resp);
        setGroups(resp);
    }

    useEffect(() => {
        listUsers();
        listGroups();
    }, [])

    return (
        <div className='container-fluid' style={{ height: '70vh', overflow: 'auto' }}>
            <div className='row'>
                {/* <button className='btn btn-outline-primary col-md-3 m-1'> Añadir un nuevo usuario</button> */}
                <div className='col-md-4 m-1'>
                    <select class="form-select form-select-md" aria-label=".form-select-lg example">
                        <option selected>{dropDownFilter}</option>
                        {
                            groups === [] ?
                                <div>
                                    <option selected>No hay datos por el momento</option>
                                </div>
                                :
                                groups.groups?.map((dat, index) =>
                                    <option>{dat.name_group}</option>
                                )
                        }
                    </select>
                </div>
                <button className='btn btn-primary col-md-1 m-1'>Filtrar</button>
                <button className='btn btn-primary col-md-2 m-1'>Agregar usuario</button>
                <button className='btn btn-outline-success col-md-2 offset-2'> Cargar excel con usuarios</button>
            </div>
            <div className='row'>
                {
                    users === [] ?
                        <div className="alert alert-warning col-md-2" role="alert">
                            No hay usuarios por el momento!
                        </div>
                        :
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
                }
            </div>
        </div>
    )
}

export default Users;