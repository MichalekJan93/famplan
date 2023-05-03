import axios from 'axios';
/**
 * Function for get data to server with GET method
 * @param {string} url endpoint url
 * @returns
 */
export const apiGet = (url) => {
    return axios.get(url)
        .then((result) => {return result})
        .catch((error) => {return error})
}