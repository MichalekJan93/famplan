/**
 * Function for get data to server with GET method
 * @param {string} url endpoint url
 * @returns
 */
export const apiGet = (url) => {
    return fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw res;
        }
        return res.json();
    })
    .catch(error => {
        return error.text ? error.text().then(errorMessage => {
            return Promise.reject({
                status: error.status,
                message: errorMessage
            });
        }) : Promise.reject({
                status: error.status,
                message: error.message
            });
    });
}