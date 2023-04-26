import React from "react";
import Menu from "../components/MenuVertical/Menu";
import AppView from "../components/AppView/AppView";
import "./Application.css"

const Application = () => {
    return (
        <div className="application">
            <Menu />
            <AppView />
        </div>
    )
}

export default Application;