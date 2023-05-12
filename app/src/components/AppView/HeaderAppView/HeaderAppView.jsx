import React, {useState, useEffect} from "react"
import './HeaderAppView.css'
import { getNameDate } from "../../../utils/getNameDay";
import { useTranslation } from "react-i18next";

const HeaderAppView = (props) => {
    const [title, setTitle] = useState(props.title);
    const { t } = useTranslation();

    const today = () => {
        const language = localStorage.getItem("i18nextLng");
        const date = new Date();
        const year = date.getFullYear();
        const day = date.getDate() -1;
        const month = date.getMonth() + 1;

        if(language === "cs" || language === "sk"){
            return `${day}. ${t("months." + month)} ${year}`;
        } else {
            return `${t("months." + month)} ${day},${year}`;
        }
    }

    const returnNameDate = () => {
        if(localStorage.getItem("i18nextLng") === "cs"){
            return <p>Dnes má svátek {getNameDate()}</p>
        } else {
            return;
        }
    }

    return (
        <div className="app-view-header">
            <h1>{title}</h1>
            <div className="app-view-header-date">
                {returnNameDate()}
                <p className="date">{today()}</p>
            </div>
        </div>
    )
}

export default HeaderAppView;