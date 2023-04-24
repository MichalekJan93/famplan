/**
 * Function for get data to server with GET method
 * @param {string} url endpoint url
 * @returns
 */
export const apiGet = (url) => {
    fetch(url)
        .then(async response => {
            if (response.ok){
                return await response.json();
            } else {
                const errorMessage = await response.text();
                return Promise.reject(new Error(errorMessage));
            }
        })
}