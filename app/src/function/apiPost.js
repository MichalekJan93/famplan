
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
        return error.text().then(errorMessage => {
            return Promise.reject(errorMessage)
        });
    });
}