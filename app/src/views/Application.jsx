import React, { useEffect } from "react";
import Menu from "../components/MenuVertical/Menu";
import AppView from "../components/AppView/AppView";
import { apiGet } from "../utils/apiGET";
import "./Application.css"

const Application = () => {
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await apiGet("http://localhost:5000/api/userData");
                console.log('res',res);
                /* localStorage.setItem("us_dat", JSON.stringify()); */
            } catch (error) {
                console.log(error)
            }
        }
        checkLogin();
    }, [])

    return (
        <div className="application">
            <Menu />
            <AppView />
        </div>
    )
}

export default Application;