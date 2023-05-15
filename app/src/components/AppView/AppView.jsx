import React from "react";

import MenuAppView from "./MenuAppView/MenuAppView";
import HeaderAppView from "./HeaderAppView/HeaderAppView";
import Calendar from "../Calendar/Calendar";

import "./AppView.css";

const AppView = ({showComponent}) => {

    return(
        <div className="app-view anop">
            <MenuAppView />
            <HeaderAppView title="Dashboard"/>
            <Calendar />
        </div>
    )
}

export default AppView;