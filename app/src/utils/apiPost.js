import axios from 'axios';
/**
 * Function for send data to server with POST method
 * @param {string} url endpoint url
 * @param {object} data object with data from fetch body
 * @returns
 */
export const apiPost = (url, data) => {
    return axios.post(url, data)
        .then(response => {return response.data})
        .catch(error => {return error});
}