import axios from 'axios';

const configPost = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
}

/**
 * Function for send data to server with POST method
 * @param {string} url endpoint url
 * @param {object} data object with data from fetch body
 * @returns
 */

export const apiPost = (url, data) => {
    return axios.post(url, data, configPost)
        .then(response => {return response.data})
        .catch(error => {return error});
}