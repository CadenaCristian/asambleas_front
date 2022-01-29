import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { AddGroup, DeleteGroup, GetAllGroups, UpdateGroup } from '../../../axios/groupsPetition';
import { UpdateQuestionById } from '../../../axios/assamblesPetition';
import ListQuestions from './questions/listQuestions';

const Groupings = () => {
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState();
    const [alertState, setAlertState] = useState("block");
    const [questionsState, setQuestiosnState] = useState("none");
    const [addGroupingState, setAddGroupingState] = useState("none");
    const [updateGroupingState, setupdateGroupingState] = useState("none");
    const [dataGroup, setdataGroup] = useState({})

    const setData = ({ target }) => {
        setdataGroup({
            ...dataGroup,
            [target.name]: target.value,
        });
    }

    console.log("dataGroup: ", dataGroup)

    const listGroups = async () => {
        const resp = await GetAllGroups();
        setGroups(resp);
        console.log("resp: ", resp)
    }

    const listById = async (id) => {
        setGroupId(id)
        setAlertState("none")
        setQuestiosnState("block")
        setAddGroupingState("none")
        setAddGroupingState("none")
    }

    const showAddGroup = () => {
        console.log("showAddGroup: entre")
        setAlertState("none")
        setQuestiosnState("none")
        setupdateGroupingState("none")
        setAddGroupingState("block")
    }

    const saveNewGroup = async () => {
        const resp = await AddGroup(dataGroup)
        if (resp.status === "200") {
            Swal.fire('alert', `${resp.message}`, 'success');
            listGroups();
        } else {
            Swal.fire('alert', `${resp.message}`, 'danger');
        }
    }

    const showEditGroup = (data) => {
        setdataGroup(data);
        setAlertState("none")
        setQuestiosnState("none")
        setupdateGroupingState("block")
        setAddGroupingState("none")
    }

    const updateGroup = async () => {
        let id = dataGroup._id
        delete dataGroup._id
        const resp = await UpdateGroup(id, dataGroup)
        if (resp.status === "200") {
            Swal.fire('alert', `${resp.message}`, 'success');
            listGroups();
        } else {
            Swal.fire('alert', `${resp.message}`, 'danger');
        }
    }

    const deleteGroup = async (id) => {
        const resp = await DeleteGroup(id)
        if (resp.status === "200") {
            Swal.fire('alert', `${resp.message}`, 'success');
            listGroups();
        } else {
            Swal.fire('alert', `${resp.message}`, 'danger');
        }
    }

    useEffect(() => {
        listGroups();
    }, [])

    return (
        <div className='container-fluid' style={{ height: '70vh', overflow: 'auto' }}>
            <div className='row'>
                <div className='col-md-6'>
                    <button type='button' className='btn btn-outline-primary col-md-12' onClick={() => showAddGroup()}> Añadir asamblea nueva</button>
                    {
                        groups === [] ?
                            <div className="alert alert-warning" role="alert">
                                No hay asambleas por el momento!
                            </div>
                            :
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Reunión zoom</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groups.groups?.map((dat, index) =>
                                        <tr>
                                            <td>{dat.name_group}</td>
                                            <td>{dat.id_meeting}</td>
                                            <td>
                                                <button type='button' onClick={() => showEditGroup(dat)} className='btn btn-warning col-md-4'>E</button>
                                                <button type='button' onClick={() => deleteGroup(dat._id)} className='btn btn-danger col-md-4'>D</button>
                                                <button type='button' onClick={() => listById(dat._id)} className='btn btn-primary col-md-4'>S</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    }
                </div>
                <div className='col-md-6'>
                    <div className="alert alert-warning" role="alert" style={{ display: alertState }}>
                        Seleccione una samblea, para ver las preguntas que tiene dicha asamblea
                    </div>

                    <div style={{ display: questionsState }}>
                        <ListQuestions group_id={groupId} />
                    </div>
                    {/* Inicio de añadir nueva asamblea */}
                    <div style={{ display: addGroupingState }}>
                        <h4 className='text-center'> Añadir asamblea nueva </h4>
                        <input type="text" className="form-control mt-1" name='name_group' onChange={setData} placeholder='Nombre de agrupación' />
                        <input type="number" className="form-control mt-1" name='id_meeting' onChange={setData} placeholder='Id zoomm' />
                        <div className='row justify-content-center'>
                            <button className='btn btn-outline-success col-md-4 mt-3' onClick={saveNewGroup}>
                                Agregar asamblea
                            </button>
                        </div>
                    </div>
                    {/* Fianl de añadir nueva asamblea */}
                    {/* Inicio de actualizar asamblea */}
                    <div style={{ display: updateGroupingState }}>
                        <h4 className='text-center'> Actualizar asamblea </h4>
                        <input type="text" className="form-control mt-1" name='name_group' value={dataGroup.name_group} onChange={setData} placeholder='Nombre de agrupación' />
                        <input type="number" className="form-control mt-1" name='id_meeting' value={dataGroup.id_meeting} onChange={setData} placeholder='Id zoomm' />
                        <div className='row justify-content-center'>
                            <button className='btn btn-outline-success col-md-4 mt-3' onClick={updateGroup}>
                                Actualizar asamblea
                            </button>
                        </div>
                    </div>
                    {/* Fianl de actualizar asamblea */}
                </div>
            </div>
        </div >

    )
}

export default Groupings;