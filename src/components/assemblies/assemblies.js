import React, { useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import 'bootstrap/dist/css/bootstrap.min.css'
import { JoinMeeting } from '../../axios/assamblesPetition';
import { apiAddress } from '../../api/api';
import Header from '../common/header';
import Votes from './votes';
import Footer from '../common/footer';


ZoomMtg.setZoomJSLib('https://source.zoom.us/2.1.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const Assambles = () => {

    var userData = JSON.parse(localStorage.getItem('userData'))
    var apiKey = 'DPKdg-EgRQOozYEH5Rh1MA'
    var meetingNumber = userData.idMeeting
    var role = 0
    var leaveUrl = 'https://master.d217lwn8yomjor.amplifyapp.com/'
    // var leaveUrl = 'http://localhost:3000'
    var userName = userData.userName
    var userEmail = ''
    var passWord = ''
    var registrantToken = ''

    const getSignature = async (e) => {
        e.preventDefault();
        let obj = {
            "meetingNumber": meetingNumber,
            "role": role
        }
        const resp = await JoinMeeting(obj);
        if (resp !== '') {
            startMeeting(resp)
        } else {
            alert("Falla")
        }
    }


    const startMeeting = (signature) => {
        document.getElementById('zmmtg-root').style.display = 'block';
        // document.getElementById('aria-notify-area').style.display = 'none';
        // document.getElementById('zmmtg-root').style.backgroundColor = 'transparent';

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

    return (
        <div className="container text-center">
            <div className='row'>
                <Header />
            </div>
            <div className='row justify-content-md-center mt-1'>
                <div className='col-md-4'>
                    <button className='btn btn-outline-primary col-md-6' data-bs-toggle="modal" data-bs-target="#voteModal">
                        VER VOTACI??N
                    </button>
                </div>
                <div className='col-md-4'>
                    <button className='btn btn-primary' onClick={getSignature}>Unirse a la reuni??n</button>
                </div>
                <div className='col-md-4'>
                    <button className='btn btn-outline-primary col-md-6'>VER QUORUM</button>
                </div>
            </div>

            <div className="modal fade" id="voteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Votes />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='row'>
                <Footer />
            </div> */}
        </div>
    );
}

export default Assambles;