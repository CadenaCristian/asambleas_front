import React from 'react';
import { apiAddress } from '../api/api';
import axios from 'axios';

export const JoinMeeting = (obj) => {
    const body = JSON.stringify(obj);
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.post(`${apiAddress}assambles/join`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        },
        body: body
    })
        .then(res => res.data.signature)
        .catch(error => {
            console.error(error)
        })
}

export const GetAllQuestions = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.get(`${apiAddress}questions/allQuestions`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}

export const GetActiveQuestions = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.get(`${apiAddress}questions/${userData.groupId}/true`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}

export const GetAllQuestionsById = (id) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.get(`${apiAddress}questions/${id}`, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        }
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}

export const UpdateQuestionById = (id, obj) => {
    const body = JSON.stringify(obj);
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.put(`${apiAddress}questions/changeState/${id}`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        },
        body: body
    })
        .then(res => res)
        .catch(error => {
            console.error(error)
        })
}

export const SaveVote = (idQuestion, answer_choise) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const body = { "id": userData._id, "name": userData.name, "answer_user": answer_choise }
    console.log("idQuestion: ", idQuestion)
    console.log("body: ", body)
    return axios.put(`${apiAddress}questions/saveVote/${idQuestion}`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        },
        body: body
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}

export const SaveQuestion = (obj) => {
    const body = JSON.stringify(obj)
    const userData = JSON.parse(localStorage.getItem('userData'));
    return axios.post(`${apiAddress}questions`, body, {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': userData.token
        },
        body: body
    })
        .then(res => res.data)
        .catch(error => {
            console.error(error)
        })
}