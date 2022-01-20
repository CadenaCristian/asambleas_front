import React, { useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import 'bootstrap/dist/css/bootstrap.min.css'
import { GetActiveQuestions, GetAllQuestions, JoinMeeting } from '../../axios/assamblesPetition';
import { apiAddress } from '../../api/api';
import Header from '../common/header';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.0.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const Assambles = () => {

    var signatureEndpoint = `${apiAddress}:4000`
    var apiKey = 'DPKdg-EgRQOozYEH5Rh1MA'
    var meetingNumber = localStorage.getItem('idMeeting')
    var role = 0
    var leaveUrl = 'https://master.d217lwn8yomjor.amplifyapp.com:3000'
    var userName = localStorage.getItem('userName')
    var userEmail = ''
    var passWord = ''
    var registrantToken = ''

    const [votes, setVotes] = useState([])

    const getSignature = async (e) => {
        e.preventDefault();
        let obj = {
            "meetingNumber": meetingNumber,
            "role": role
        }
        const resp = await JoinMeeting(obj);
        console.log("resp: ", resp)
        if (resp !== '') {
            startMeeting(resp)
        } else {
            alert("Falla")
        }
    }


    const startMeeting = (signature) => {
        document.getElementById('zmmtg-root').style.display = 'block'

        ZoomMtg.init({
            leaveUrl: leaveUrl,
            success: (success) => {
                console.log(success)

                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: meetingNumber,
                    userName: userName,
                    apiKey: apiKey,
                    userEmail: userEmail,
                    passWord: passWord,
                    tk: registrantToken,
                    success: (success) => {
                        console.log(success)
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })

            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    const showActiveVotes = async () => {
        const resp = await GetActiveQuestions();
        setVotes(resp);

    }

    console.log("votes: ", votes);

    return (
        <div className="container text-center">
            <div className='row'>
                <Header />
            </div>
            <div className='row justify-content-md-center mt-3'>
                <div className='col-md-6'>
                    <button className='btn btn-outline-primary col-md-6' onClick={showActiveVotes} data-bs-toggle="modal" data-bs-target="#voteModal">
                        VER VOTACIÓN
                    </button>
                </div>
                <div className='col-md-6'><button className='btn btn-outline-primary col-md-6'>VER QUORUM</button></div>
            </div>
            <div className='row mt-3'>
                <main>
                    <h1>Reunión por zoom</h1>

                    <button className='btn btn-primary' onClick={getSignature}>Unirse a la reunión</button>
                </main>
            </div>
            <div className='row mt-3'>
            </div>

            <div className="modal fade" id="voteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {votes === [] ?
                                <div className="alert alert-warning" role="alert">
                                    No hay votaciones activas por el momento!
                                </div>
                                :
                                votes.data?.map((dat, index) =>
                                    <div>
                                        <div className="alert alert-success" role="alert">
                                            {dat.question_name}
                                        </div>
                                        {dat.answer_options?.map((ans, index) =>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id={index} />
                                                <label class="form-check-label" for="flexRadioDefault1">{ans}</label>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assambles;