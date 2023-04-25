/**
 * Features for checking email
 * @param {string} email email address
 * @returns boolean true or false
 */
export const controlEmail = (email) =>{
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailFormat)){
        return true;
    } else {
        return false;
    }
}