import React from "react";

import MenuAppView from "./MenuAppView/MenuAppView";
import HeaderAppView from "./HeaderAppView/HeaderAppView";
import MonthCalendar from "../Calendar/MonthCalendar/MonthCalendar";

import "./AppView.css";

const AppView = ({showComponent}) => {

    return(
        <div className="app-view anop">
            <MenuAppView />
            <HeaderAppView title="Dashboard"/>
            <MonthCalendar/>
        </div>
    )
}

export default AppView;