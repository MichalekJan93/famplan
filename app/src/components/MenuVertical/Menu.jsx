/**
 * COMPONENT Menu
 * Component for creating vertical menu
 * MIJN 230425 - Created component
 */
import React from "react";
import logo from '../../assets/images/famplan-logo.png'
import { useTranslation } from "react-i18next";
import '../../styles/Menu.css'

const Menu = () => {

    const { t } = useTranslation();

    return(
        <div className="vertical-menu">
            <a className="logo" href="#"> {/* //TODO */}
                <img src={logo} alt="Famplan logo" />
            </a>
            <div className="menu-list">
                <div className="menu-box">
                        <div className="menu-item menu-item-dashboard active"></div>
                        <p className="active">{t("components.dashboard")}</p>
                </div>
                <div className="menu-box">
                        <div className="menu-item menu-item-calendar"></div>
                        <p>{t("components.calendar")}</p>
                </div>
                <div className="menu-box">
                        <div className="menu-item menu-item-family-plans"></div>
                        <p>{t("components.familyPlans")}</p>
                </div>
                <div className="menu-box">
                        <div className="menu-item menu-item-shopping-list"></div>
                        <p>{t("components.shoppingList")}</p>
                </div>
            </div>
            <div className="user-set">
                <div className="menu-box">
                        <div className="menu-item menu-item-setting"></div>
                        <div className="menu-item menu-item-logout"></div>
                </div>
            </div>
        </div>
    );
}

export default Menu;