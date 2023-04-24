/**
 * Function for send data to server with POST method
 * @param {string} url endpoint url
 * @param {object} data object with data from fetch body
 * @returns
 */
export const apiPost = (url, data) => {
    return fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
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