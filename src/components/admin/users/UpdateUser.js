import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { GetAllGroups } from '../../../axios/groupsPetition';
import { updateOldUser } from '../../../axios/usersPetition';

const UpdateUser = ({ updateUser }) => {
    const [groups, setGroups] = useState([]);
    const rolUser = ["admin", "attendee", "user"]
    const [dataUserValue, setdataUserValue] = useState({})

    const setDataUser = ({ target }) => {
        setdataUserValue({
            ...dataUserValue,
            [target.name]: target.value,
        });
    }

    const listGroups = async () => {
        const resp = await GetAllGroups();
        setGroups(resp);
    }

    const saveUser = async (id) => {
        const resp = await updateOldUser(id, dataUserValue);
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
            <input type="text" className="form-control mt-1" name="name" onChange={setDataUser} placeholder={updateUser.name} />
            <input type="text" className="form-control mt-1" name="userName" onChange={setDataUser} placeholder={updateUser.userName} />
            <input type="text" className="form-control mt-1" name="email" onChange={setDataUser} placeholder={updateUser.email} />
            <select class="form-select form-select-md form-control mt-1" name="rol" onChange={setDataUser} >
                <option selected>{updateUser.rol}</option>
                {
                    rolUser.map((dat, index) =>
                        <option>{dat}</option>
                    )}
            </select>
            <select class="form-select form-select-md form-control mt-1" name="group_id" onChange={setDataUser} >
                <option selected>{updateUser.group_id}</option>
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
                    <input type="text" className="form-control col-md-6" name="id_meeting" onChange={setDataUser} placeholder={updateUser.id_meeting} />
                </div>
                <div className='col-md-6'>
                    <input type="number" className="form-control col-md-6" name="coefficient" onChange={setDataUser} placeholder={updateUser.coefficient} />
                </div>
            </div>
            <div className='row mt-1'>
                <div className='col-md-6'>
                    <input type="text" className="form-control" name="id" onChange={setDataUser} placeholder={updateUser.id} />
                </div>
                <div className='col-md-6'>
                    <input type="text" className="form-control" name="password" onChange={setDataUser} placeholder={updateUser.password} />
                </div>
            </div>
            <div className='row justify-content-center'>
                <label className='text-center'>¿Puede votar?</label>
                <div class="form-check col-md-1">
                    <input class="form-check-input" type="radio" name="vote" value={true} onClick={setDataUser} id="flexRadioDefault1" checked={updateUser.vote} />
                    <label class="form-check-label" for="flexRadioDefault1">
                        SI
                    </label>
                </div>
                <div class="form-check col-md-1">
                    <input class="form-check-input" type="radio" name="vote" value={false} onClick={setDataUser} id="flexRadioDefault2" checked={updateUser.vote} />
                    <label class="form-check-label" for="flexRadioDefault2">
                        NO
                    </label>
                </div>
            </div>
            <div className='row justify-content-center'>
                <button type="button" id="btn-close" className="btn btn-secondary m-3 col-md-4" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-success m-3 col-md-4" onClick={() => saveUser(updateUser._id)}>Guardar</button>
            </div>
        </div>
    )
}

export default UpdateUser;