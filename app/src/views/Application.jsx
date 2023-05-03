import React, { useEffect, useState } from "react";
import Menu from "../components/MenuVertical/Menu";
import AppView from "../components/AppView/AppView";
import { apiPost } from "../utils/apiPost";
import "./Application.css"

const Application = () => {

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await apiPost("http://localhost:5000/api/userData", {userID : localStorage.getItem('us_dat')});
                console.log(res);
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