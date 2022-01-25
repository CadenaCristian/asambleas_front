import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { GetActiveQuestions, SaveVote } from '../../axios/assamblesPetition';

const Votes = () => {
    const [votes, setVotes] = useState([]);
    const [choise, setChoise] = useState();
    const [idQuestion, setIdQuestion] = useState();

    const showActiveVotes = async () => {
        const resp = await GetActiveQuestions();
        setVotes(resp);
    }

    const voteObject = (questionId, answerChoise) => {
        setChoise(answerChoise);
        setIdQuestion(questionId);
    }

    const saveVote = async () => {
        const resp = await SaveVote(idQuestion, choise);
        if (resp.status === "200") {
            Swal.fire('alert', `${resp.message}`, 'success');
            let link = document.getElementById('btn-close');
            link.click();
        } else {
            Swal.fire('alert', `${resp.message}`, 'danger');
        }
    }

    useEffect(() => {
        showActiveVotes();
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                {votes === [] ?
                    <div className="alert alert-warning" role="alert">
                        No hay votaciones activas por el momento!
                    </div>
                    :
                    votes.data?.map((dat, index) =>
                        <div key={index}>
                            <div className="alert alert-success" role="alert">
                                {dat.question_name}
                            </div>
                            {dat.answer_options?.map((ans, index) =>
                                <div class="form-check" key={index}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" onChange={() => voteObject(dat._id, index)} />
                                    <label class="form-check-label" for="flexRadioDefault1">{ans}</label>
                                </div>
                            )}
                        </div>
                    )}
            </div>
            <div className='row justify-content-center'>
                <button type="button" id="btn-close" className="btn btn-secondary m-3 col-md-4" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary m-3 col-md-4" onClick={() => saveVote()}>Save changes</button>
            </div>
        </div>
    )
}

export default Votes;