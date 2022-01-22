import React from 'react';
import { apiAddress } from '../api/api';
import axios from 'axios';

export const GetAllGroups = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.get(`${apiAddress}groups`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}