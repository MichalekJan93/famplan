import { apiPost } from "../../function/apiPost";
import { useTranslation } from "react-i18next";
import { controlEmail } from "../../function/controlInput";
import { useState, useRef, useEffect } from "react";
import './LoginForm.css'

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

    const sendData = async (event) => {
        event.preventDefault();
    }

    return(
        <div className="form anop">
            <h2>{t("login.login")}</h2>
            <form action="" onSubmit={sendData}>
            <div className="inputBox">
                <input type="text" ref={inputEmail} value={userEmail} onChange={(event) => {
                    setUserEmail(event.target.value);
                }}/>
                <span ref={labelEmail}>{t("login.email")}</span>
            </div>
            <div className="inputBox">
                <input type="password" ref={inputPassword} value={userPassword} onChange={(event) => {
                    setUserPassword(event.target.value);
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