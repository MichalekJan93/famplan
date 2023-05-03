/**
 * Function for send data to server with DELETE method
 * @param {string} url endpoint url
 * @returns
 */
export const apiDelete = (url) => {
    return fetch(url,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
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