import { apiPost } from "../../utils/apiPost";
import { useTranslation } from "react-i18next";
import { controlEmail } from "../../utils/controlInput";
import Cookies from 'universal-cookie';
import { useState, useRef} from "react";
import './RegLogForm.css'

const LoginForm = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const labelEmail = useRef(null);
    const labelPassword = useRef(null);
    const errorMessage = useRef(null);
    const errorParagraph = useRef(null);

    const { t } = useTranslation();

    const cookies = new Cookies();

    const sendData = async (event) => {
        event.preventDefault();
        if(userEmail && userPassword){
            const data = {
                "email": userEmail,
                "password": userPassword
            }
            if(controlEmail(userEmail)){
                try {
                    const res = await apiPost("http://localhost:5000/api/auth", data);
                    if(res.verify === 1 && res.userID){
                        window.open("http://localhost:3000/app", "_self");
                    } else{
                        setBorderColor(inputEmail.current, false);
                        setColor(labelEmail.current, false);
                        setBorderColor(inputPassword.current, false);
                        setColor(labelPassword.current, false);
                        setError(t("forMessages.invalidLogin"));
                    }
                } catch (error) {
                    setError(t("serverMessages.errorServer"));
                }
            } else{
                setBorderColor(inputEmail.current, false);
                setColor(labelEmail.current, false);
                setError(t("forMessages.wrongEmail"));
                return;
            }
        }else{
            if(!inputEmail.current.value){
                setBorderColor(inputEmail.current, false);
                setColor(labelEmail.current, false);
                setError(t("forMessages.fillFields"));
            }
            if(!inputPassword.current.value){
                setBorderColor(inputPassword.current, false);
                setColor(labelPassword.current, false);
                setError(t("forMessages.fillFields"));
            }
        }
    }

    const setError = (message) => {
        errorMessage.current.style.display = "inline-block";
        errorParagraph.current.innerHTML = message;
    }

    const setColor = (element, boolean) => {
        if (boolean === true) {
            element.style.color = "rgb(199, 199, 199)";
          } else {
            element.style.color = "#EF475E";
          }
    }

    const setBorderColor = (element, boolean) => {
        if (boolean === true) {
            element.style.border = "1px solid rgb(199, 199, 199)";
            element.classList.add("valid");
          } else {
            element.style.border = "1px solid #EF475E";
          }
    }

    return(
        <div className="form anop">
            <h2>{t("login.login")}</h2>
            <form action="" onSubmit={sendData}>
            <div className="inputBox">
                <input type="text" ref={inputEmail} value={userEmail} onChange={(event) => {
                    setUserEmail(event.target.value);
                    setBorderColor(event.target, true);
                    setColor(labelEmail.current, true);
                }}/>
                <span ref={labelEmail}>{t("login.email")}</span>
            </div>
            <div className="inputBox">
                <input type="password" ref={inputPassword} value={userPassword} onChange={(event) => {
                    setUserPassword(event.target.value);
                    setBorderColor(event.target, true);
                    setColor(labelPassword.current, true);
                }}/>
                <span ref={labelPassword}>{t("login.password")}</span>
            </div>
            <div className="errorMessage bgrd-tr angd" ref={errorMessage}><p className="clrd" ref={errorParagraph}></p></div>
            <button className="bggr btn brgr">{t("login.loginButton")}</button>
            </form>
        </div>
    )
}

export default LoginForm;