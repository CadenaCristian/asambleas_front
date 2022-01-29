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

export const AddGroup = (obj) => {
    const body = JSON.stringify(obj);
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.post(`${apiAddress}groups`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}

export const UpdateGroup = (id, obj) => {
    const body = JSON.stringify(obj);
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.put(`${apiAddress}groups/${id}`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}

export const DeleteGroup = (id) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.delete(`${apiAddress}groups/${id}`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}
