import axios from 'axios';

const configPost = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
}

/**
 * Function for send data to server with DELETE method
 * @param {string} url endpoint url
 * @returns
 */
export const apiDelete = (url) => {
    return axios.delete(url,configPost)
    .then(response => {return response.data})
    .catch(error => {return error});
}