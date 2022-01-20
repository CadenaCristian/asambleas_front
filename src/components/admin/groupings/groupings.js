import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllGroups } from '../../../axios/groupsPetition';
import { GetAllQuestions, GetAllQuestionsById, UpdateQuestionById } from '../../../axios/assamblesPetition';

const Groupings = () => {
    const [groups, setGroups] = useState([]);
    const [assambles, setAssambles] = useState([]);

    const listGroups = async () => {
        const resp = await GetAllGroups();
        setGroups(resp);
    }

    const listQuestionsById = async (e) => {
        const resp = await GetAllQuestionsById(e.target.id)
        setAssambles(resp)
    }

    const UpdateQuestionState = (id) => {
        console.log("UpdateQuestionState: ", id)
        // const resp = await UpdateQuestionById(e.target.id)
        // setAssambles(resp);
    }

    console.log("assambles: ", assambles)
    console.log("groups: ", groups)
    useEffect(() => {
        listGroups();
    }, [])

    return (
        <div className='container-fluid' style={{ height: '70vh', overflow: 'auto' }}>
            <div className='row'>
                <div className='col-md-5'>
                    <button className='btn btn-outline-primary col-md-12'> Añadir asamblea nueva</button>
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
                                                <button type='button' id={dat._id} onClick={(e) => listQuestionsById(e)} className='btn btn-warning col-md-4'>E</button>
                                                <button type='button' id={dat._id} onClick={(e) => listQuestionsById(e)} className='btn btn-danger col-md-4'>D</button>
                                                <button type='button' id={dat._id} onClick={(e) => listQuestionsById(e)} className='btn btn-primary col-md-4'>S</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    }
                </div>
                <div className='col-md-7'>
                    {assambles.data?.map((dat, index) =>
                        <div key={index} className="accordion" id={`accordion${index}`}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls="collapseOne">
                                        {dat.question_name}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse hide" aria-labelledby={`heading${index}`} data-bs-parent={`#accordion${index}`}>
                                    <div className="accordion-body">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault${index}`} onChange={UpdateQuestionState(dat._id)} checked={dat.state} />
                                            <label class="form-check-label" for={`flexSwitchCheckDefault${index}`}>Visibilidad de la votación</label>
                                        </div>
                                        <table className="table table-hover text-center">
                                            <thead>
                                                <tr>
                                                    <th>Usuario</th>
                                                    <th>Respuesta</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dat.voter?.map((vot, index) =>
                                                    <tr key={index}>
                                                        <td>{vot.name}</td>
                                                        <td>{dat.answer_options[vot.answer_user]}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >

    )
}

export default Groupings;