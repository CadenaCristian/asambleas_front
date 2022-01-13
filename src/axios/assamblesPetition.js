import React from 'react';
import { apiAddress } from '../api/api';
import axios from 'axios';

export const JoinMeeting = (obj) => {
    const body = JSON.stringify(obj);
    return axios.post(`${apiAddress}assambles/join`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': localStorage.getItem('Token')
        },
        body: body
    })
        .then(res => res.data.signature)
        .catch(error => {
            console.error(error)
        })
}

export const GetAllQuestions = () => {
    return axios.get(`${apiAddress}assambles/allQuestions`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': localStorage.getItem('Token')
        }
    })
        .then(res => console.log(res))
        .catch(error => {
            console.error(error)
        })
}
