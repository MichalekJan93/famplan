/**
 * COMPONENT RegistrationForm
 * Component for creating a registration form
 * MIJN 230424 - Created component
 */

import { useState, useRef, useEffect } from "react";
import { apiPost } from "../../function/apiPost";
import { useTranslation } from "react-i18next";
import { controlEmail } from "../../function/controlInput";
import './RegistrationForm.css'

const RegistrationForm = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword1, setUserPassword1] = useState("");
    const [userPassword2, setUserPassword2] = useState("");

    const inputEmail = useRef(null);
    const inputPassword1 = useRef(null);
    const inputPassword2 = useRef(null);
    const labelEmail = useRef(null);
    const labelPassword1 = useRef(null);
    const labelPassword2 = useRef(null);
    const errorMessage = useRef(null);
    const errorParagraph = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
        if(userEmail.length <= 0){
            inputEmail.current.classList.remove("valid");
        }
    }, [userEmail])

    useEffect(() => {
        if(userPassword1.length <= 0){
            inputPassword1.current.classList.remove("valid");
        }
    }, [userPassword1])

    useEffect(() => {
        if(userPassword2.length <= 0){
            inputPassword2.current.classList.remove("valid");
        }
    }, [userPassword2])

    const sendData = async (event) => {
        event.preventDefault();

        if(userEmail && userPassword1 && userPassword2){
            const data = {
                "email": userEmail,
                "password": userPassword1
            }
            if(controlEmail(userEmail)){
                if(userPassword1 === userPassword2){
                    if(userPassword1.length >= 6){
                        try{
                            const res = await apiPost("http://localhost:5000/api/registrationUser", data);
                            console.log(res);
                        }catch(error){
                            if(error.status === 409){
                                setBorderColor(inputEmail.current, false);
                                setColor(labelEmail.current, false);
                                setError(t("serverMessages.conflictEmail"));
                            } else {
                                console.log("Iny to errorek") //TODO
                            }
                        }
                        return;
                    }else{
                        setBorderColor(inputPassword1.current, false);
                        setColor(labelPassword1.current, false);
                        setBorderColor(inputPassword2.current, false);
                        setColor(labelPassword2.current, false);
                        setError(t("forMessages.passwordCharacter"));
                        return;
                    }
                } else {
                    setBorderColor(inputPassword1.current, false);
                    setColor(labelPassword1.current, false);
                    setBorderColor(inputPassword2.current, false);
                    setColor(labelPassword2.current, false);
                    setError(t("forMessages.passwordNotMatch"));
                    return;
                }
            } else{
                setBorderColor(inputEmail.current, false);
                setColor(labelEmail.current, false);
                setError(t("forMessages.wrongEmail"));
                return;
            }
        } else {
            if(!inputEmail.current.value){
                setBorderColor(inputEmail.current, false);
                setColor(labelEmail.current, false);
                setError(t("forMessages.fillFields"));
            }
            if(!inputPassword1.current.value){
                setBorderColor(inputPassword1.current, false);
                setColor(labelPassword1.current, false);
                setError(t("forMessages.fillFields"));
            }
            if(!inputPassword2.current.value){
                setBorderColor(inputPassword2.current, false);
                setColor(labelPassword2.current, false);
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
            <h2>{t("signup.signup")}</h2>
            <form action="" onSubmit={sendData}>
            <div className="inputBox">
                <input type="text" ref={inputEmail} value={userEmail} onChange={(event) => {
                    setUserEmail(event.target.value);
                    setBorderColor(event.target, true);
                    setColor(labelEmail.current, true);
                }}/>
                <span ref={labelEmail}>{t("signup.email")}</span>
            </div>
            <div className="inputBox">
                <input type="password" ref={inputPassword1} value={userPassword1} onChange={(event) => {
                    setUserPassword1(event.target.value);
                    setBorderColor(event.target, true);
                    setColor(labelPassword1.current, true);
                }}/>
                <span ref={labelPassword1}>{t("signup.password")}</span>
            </div>
            <div className="inputBox">
                <input type="password" ref={inputPassword2} value={userPassword2} onChange={(event) => {
                    setUserPassword2(event.target.value);
                    setBorderColor(event.target, true);
                    setColor(labelPassword2.current, true);
                }}/>
                <span ref={labelPassword2}>{t("signup.repeatPassword")}</span>
            </div>
            <p className="form-help">{t("signup.passwordLength")}</p>
            <div className="errorMessage bgrd-tr angd" ref={errorMessage}><p className="clrd" ref={errorParagraph}></p></div>
            <button className="bggr btn brgr">{t("signup.signup")}</button>
            </form>
        </div>
    )
}

export default RegistrationForm;