export const controlEmail = (email) =>{
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailFormat)){
        return true;
    } else {
        return false;
    }
}