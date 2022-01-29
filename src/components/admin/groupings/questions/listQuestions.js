import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { GetAllQuestionsById, UpdateQuestionById } from '../../../../axios/assamblesPetition';

const ListQuestions = ({ group_id }) => {

    const [assambles, setAssambles] = useState([]);

    const listQuestionsById = async (id) => {
        const resp = await GetAllQuestionsById(id)
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

    console.log("assambles: ", assambles)
    useEffect(() => {
        listQuestionsById(group_id)
    }, [group_id])

    return (
        <div>
            <div>
                <button className='btn btn-outline-primary col-md-12'> Añadir nueva pregunta</button>
                {assambles.data?.length === 0 ?
                    <div className="alert alert-warning mt-2" role="alert">
                        No hay preguntas por el momento!
                    </div>
                    :
                    assambles.data?.map((dat, index) =>
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
        </div>
    )
}

export default ListQuestions;