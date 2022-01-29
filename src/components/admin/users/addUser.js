import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { GetAllGroups } from '../../../axios/groupsPetition';
import { saveNewUser } from '../../../axios/usersPetition';
import Users from './users';

const AddUser = () => {
    const [groups, setGroups] = useState([]);
    const rolUser = ["admin", "attendee", "user"]
    const [dataUserValue, setdataUserValue] = useState({
        name: "", userName: "", email: "", id: "", password: "", group_id: "", id_meeting: "", vote: false, coefficient: 0, rol: "", userState: false
    })
    const { name, userName, email, id, password, group_id, id_meeting, vote, coefficient, rol, userState } = dataUserValue;

    const setDataUser = ({ target }) => {
        setdataUserValue({
            ...dataUserValue,
            [target.name]: target.value,
        });
    }
    console.log("dataUserValue: ", dataUserValue)
    const listGroups = async () => {
        const resp = await GetAllGroups();
        setGroups(resp);
    }

    const saveUser = async () => {
        const resp = await saveNewUser(dataUserValue);
        if (resp.status === "200") {
            Swal.fire('alert', `${resp.message}`, 'success');
            let link = document.getElementById('btn-close');
            link.click();
        } else {
            Swal.fire('alert', `${resp.message}`, 'danger');
        }
    }

    useEffect(() => {
        listGroups();
    }, [])

    return (
        <div className='container'>
            <h4 className='text-center'> Añadir un nuevo usuario</h4>
            <input type="text" className="form-control mt-1" name="name" onChange={setDataUser} value={name} placeholder='Nombre' />
            <input type="text" className="form-control mt-1" name="userName" onChange={setDataUser} value={userName} placeholder='Alias del usuario' />
            <input type="text" className="form-control mt-1" name="email" onChange={setDataUser} value={email} placeholder='Correo electronico' />
            <select class="form-select form-select-md form-control mt-1" name="rol" onChange={setDataUser} >
                <option selected>Seleccione un rol</option>
                {
                    rolUser.map((dat, index) =>
                        <option>{dat}</option>
                    )}
            </select>
            <select class="form-select form-select-md form-control mt-1" name="group_id" onChange={setDataUser} >
                <option selected>Escoja una opción</option>
                {
                    groups === [] ?
                        <div>
                            <option selected>No hay datos por el momento</option>
                        </div>
                        :
                        groups.groups?.map((dat, index) =>
                            <option value={dat._id}>{dat.name_group}</option>
                        )
                }
            </select>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <input type="text" className="form-control col-md-6" name="id_meeting" onChange={setDataUser} value={id_meeting} placeholder='ID reunión zoom' />
                </div>
                <div className='col-md-6'>
                    <input type="number" className="form-control col-md-6" name="coefficient" onChange={setDataUser} value={coefficient} placeholder='Coeficiente' />
                </div>
            </div>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <input type="text" className="form-control" name="id" onChange={setDataUser} value={id} placeholder='Cedula' />
                </div>
                <div className='col-md-6'>
                    <input type="text" className="form-control" name="password" onChange={setDataUser} value={password} placeholder='Contraseña' />
                </div>
            </div>
            <div className='row justify-content-center'>
                <label className='text-center'>¿Puede votar?</label>
                <div class="form-check col-md-1">
                    <input class="form-check-input" type="radio" name="vote" value={true} onClick={setDataUser} id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                        SI
                    </label>
                </div>
                <div class="form-check col-md-1">
                    <input class="form-check-input" type="radio" name="vote" value={false} onClick={setDataUser} id="flexRadioDefault2" />
                    <label class="form-check-label" for="flexRadioDefault2">
                        NO
                    </label>
                </div>
            </div>
            <div className='row justify-content-center'>
                <button type="button" id="btn-close" className="btn btn-secondary m-3 col-md-4" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success m-3 col-md-4" onClick={() => saveUser()}>Guardar</button>
            </div>
        </div>
    )
}

export default AddUser;
