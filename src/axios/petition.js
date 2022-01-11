import React from 'react';
import { apiAddress } from '../api/api';
import axios from 'axios';

export const LoginService = (obj) => {
    const body = JSON.stringify(obj);
    return axios.post(`${apiAddress}users/login`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => res)
        .catch(err => err)
}

export const JoinMeeting = (obj) => {
    const body = JSON.stringify(obj);
    return axios.post(`${apiAddress}assambles/assambles`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': localStorage.getItem('Token')
        },
        body: body
    })
        .then(res => res.data.signature)
        // .then(response => {
        //     startMeeting(response.signature)
        // })
        .catch(error => {
            console.error(error)
        })

}