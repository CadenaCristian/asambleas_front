import React from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import 'bootstrap/dist/css/bootstrap.min.css'
import { JoinMeeting } from '../../axios/petition';
import { apiAddress } from '../../api/api';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.0.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const Assambles = () => {

    var signatureEndpoint = `${apiAddress}:4000`
    var apiKey = 'DPKdg-EgRQOozYEH5Rh1MA'
    var meetingNumber = '84853149225'
    var role = 0
    var leaveUrl = 'https://master.d217lwn8yomjor.amplifyapp.com:3000'
    var userName = localStorage.getItem('userName')
    var userEmail = 'cristilopezca@gmail.com'
    var passWord = 'dwadadw221'
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

    return (
        <div className="container text-center">
            <main>
                <h1>Zoom Meeting SDK Sample React</h1>

                <button className='btn btn-primary' onClick={getSignature}>Join Meeting</button>
            </main>
        </div>
    );
}

export default Assambles;
