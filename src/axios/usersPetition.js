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

export const getAllusers = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.get(`${apiAddress}users`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

export const saveNewUser = (obj) => {
    const body = JSON.stringify(obj);
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.post(`${apiAddress}users`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

export const updateOldUser = (id, obj) => {
    const body = JSON.stringify(obj);
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.put(`${apiAddress}users/${id}`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

export const deleteOldUser = (id) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.delete(`${apiAddress}users/${id}`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(err => err)
}