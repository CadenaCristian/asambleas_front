import React from 'react';
import { apiAddress } from '../api/api';
import axios from 'axios';

export const GetAllGroups = () => {
    return axios.get(`${apiAddress}groups`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': localStorage.getItem('Token')
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}