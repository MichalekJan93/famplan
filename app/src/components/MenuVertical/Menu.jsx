/**
 * COMPONENT Menu
 * Component for creating vertical menu
 * MIJN 230425 - Created component
 */
import React, {useRef} from "react";
import logo from '../../assets/images/famplan-logo.png'
import { useTranslation } from "react-i18next";
import { apiDelete } from "../../utils/apiDelete";
import './Menu.css'

const Menu = ({switchComponent}) => {

    const { t } = useTranslation();

    const verticalMenu = useRef(null);
    const controlMenu = useRef(null);
    const menuElement1 = useRef(null);
    const menuElement2 = useRef(null);
    const menuElement3 = useRef(null);
    const menuElement4 = useRef(null);

    const showMenu = () => {
        verticalMenu.current.classList.toggle("active");
        controlMenu.current.classList.toggle("active");
    }

    const logout = async () => {
        try {
            const res = await apiDelete("http://localhost:5000/api/auth");
            if(res.logOut === true){
                window.open("http://localhost:3000/login", "_self");
            } else{
                console.log(res.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const activeMenu = (menuElement) => {
        menuElement1.current.children[0].classList.remove("active");
        menuElement2.current.children[0].classList.remove("active");
        menuElement3.current.children[0].classList.remove("active");
        menuElement4.current.children[0].classList.remove("active");

        menuElement.current.children[0].classList.add("active");
        return;
    }

    return(
        <div className="vertical-menu active anop" ref={verticalMenu}>
            <div className="control-menu active" onClick={showMenu} ref={controlMenu}></div>
            <a className="logo" href="#"> {/* //TODO */}
                <img src={logo} alt="Famplan logo" />
            </a>
            <div className="menu-list">
                <div className="menu-box" ref={menuElement1} onClick={() => {
                    activeMenu(menuElement1);
                    switchComponent("Dashboard")}}>
                        <div className="menu-item menu-item-dashboard active"></div>
                </div>
                <div className="menu-box" ref={menuElement2} onClick={() => {
                    activeMenu(menuElement2);
                    switchComponent("Calendar")}}>
                        <div className="menu-item menu-item-calendar"></div>
                </div>
                <div className="menu-box" ref={menuElement3} onClick={() => {
                    activeMenu(menuElement3);
                    switchComponent("FamilyPlans")}}>
                        <div className="menu-item menu-item-family-plans"></div>
                </div>
                <div className="menu-box" ref={menuElement4} onClick={() => {
                    activeMenu(menuElement4);
                    switchComponent("ShoppingList")}}>
                        <div className="menu-item menu-item-shopping-list"></div>
                </div>
            </div>
            <div className="user-set">
                <div className="menu-box">
                        <div className="menu-item menu-item-setting"></div>
                        <div className="menu-item menu-item-logout" onClick={logout}></div>
                </div>
            </div>
        </div>
    );
}

export default Menu;