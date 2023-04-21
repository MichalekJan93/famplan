import { useState} from "react";
import { apiPost } from "../../function/apiPost";

const RegistrationForm = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword1, setUserPassword1] = useState("");
    const [userPassword2, setUserPassword2] = useState("");

    const sendData = async (event) => {
        event.preventDefault();

        if(userEmail && userPassword1 && userPassword2){
            const data = {
                "email": userEmail,
                "password": userPassword1
            }
            try{
                const res = await apiPost("http://localhost:5000/api/registrationUser", data);
                console.log(res);
            }catch(error){
                console.log(error);
            }
        } else {

        }
    }

    return(
        <div className="form angd">
            <form action="" onSubmit={sendData}>
            <div className="inputBox">
                <input type="text" required="required" value={userEmail} onChange={(event) => setUserEmail(event.target.value)}/>
                <span>Email</span>
            </div>
            <div className="inputBox">
                <input type="text" required="required" value={userPassword1} onChange={(event) => setUserPassword1(event.target.value)}/>
                <span>Heslo</span>
            </div>
            <div className="inputBox">
                <input type="text" required="required" value={userPassword2} onChange={(event) => setUserPassword2(event.target.value)}/>
                <span>Opakujte heslo</span>
            </div>
            <button className="s-button bc-black c-white">Registrovat</button>
            </form>
        </div>
    )
}

export default RegistrationForm;