import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { GetAllGroups } from '../../../axios/groupsPetition';
import { GetAllQuestions, GetAllQuestionsById, UpdateQuestionById } from '../../../axios/assamblesPetition';

const Groupings = () => {
    const [groups, setGroups] = useState([]);
    const [assambles, setAssambles] = useState([]);

    const listGroups = async () => {
        const resp = await GetAllGroups();
        setGroups(resp);
        console.log("resp: ", resp)
    }

    const listQuestionsById = async (e) => {
        const resp = await GetAllQuestionsById(e.target.id)
        setAssambles(resp)
    }

    const UpdateQuestionState = async (id, state) => {
        state = state === true ? false : true
        let obj = {
            "state": state
        }
        const resp = await UpdateQuestionById(id, obj)
        // setAssambles(resp);
    }
    console.log("groups: ", groups)
    console.log("assambles: ", assambles)
    useEffect(() => {
        listGroups();
    }, [])

    return (
        <div className='container-fluid' style={{ height: '70vh', overflow: 'auto' }}>
            <div className='row'>
                <div className='col-md-6'>
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
                <div className='col-md-6'>
                    {assambles.length === 0 ?
                        <div className="alert alert-warning" role="alert">
                            Seleccione una samblea, para ver las preguntas que tiene dicha asamblea
                        </div>
                        :
                        <div>
                            <button className='btn btn-outline-primary col-md-12'> Añadir nueva pregunta</button>
                            {assambles.data?.map((dat, index) =>
                                <div key={index} className="accordion mt-2" id={`accordion${index}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`heading${index}`}>
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls="collapseOne">
                                                {dat.question_name}
                                            </button>
                                        </h2>
                                        <div id={`collapse${index}`} className="accordion-collapse collapse hide" aria-labelledby={`heading${index}`} data-bs-parent={`#accordion${index}`}>
                                            <div className="accordion-body">
                                                <BootstrapSwitchButton
                                                    checked={dat.state}
                                                    onlabel='Activo'
                                                    onstyle='success'
                                                    offlabel='Inactivo'
                                                    offstyle='danger'
                                                    width={100}
                                                    onChange={() => { UpdateQuestionState(dat._id, dat.state) }}
                                                />
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
                    }
                </div>
            </div>
        </div >

    )
}

export default Groupings;