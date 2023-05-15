import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import '../Calendar.css';
import DayBox from "./DayBox";

const MonthCalendar = () => {
    const date = new Date();
    const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
    const [currentMonth, setCurrentMonth] = useState(date.getMonth() + 1 );
    const [currentYear, setCurrentYear] = useState(date.getFullYear());

    const [days, setDays] = useState([]);

    const { t } = useTranslation();

    const firstDayOfMonth = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        if (language === "en") {
            return firstDay;
        } else {
            if (firstDay === 0) {
                return 7;
            } else {
                return firstDay;
            }
        }
    }

    const lastDateOfMonth = () => {
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }

    const lastDayOfMonth = () => {
        return new Date(currentYear, currentMonth, lastDateOfMonth()).getDay() + 1;
    }

    const lastDateOfLastMonth = () => {
        return new Date(currentYear, currentMonth, 0).getDate();
    }

    const controlCalendar = (operation) => {
        if (operation === "left") {
            if(currentMonth - 1 === 0){
                setCurrentMonth(12);
                setCurrentYear(prevYear => prevYear - 1);
                return;
            }
            setCurrentMonth(prevMonth => prevMonth - 1)
        } else {
            if(currentMonth + 1 === 13){
                setCurrentMonth(1);
                setCurrentYear(prevYear => prevYear + 1);
                return;
            }
            setCurrentMonth(prevMonth => prevMonth + 1)
        }
    }

    const createArrayDays = () => {
        let days = [];
        for( let i = 1; i <= lastDateOfMonth(); i++ ){
            days.push(i);
        }
        setDays(days);
    }

    useEffect(() => {
        createArrayDays();
    },[controlCalendar]);

    return (
        <div className="month-calendar">
            <div className="date">
                <button className="btn-control" id="left" onClick={() => {controlCalendar("left")}}></button>
                <p className="year-with-months">{t("monthsCalendar." + currentMonth) + " " + currentYear}</p>
                <button className="btn-control" id="right" onClick={() => {controlCalendar("right")}}></button>
            </div>
            <div className="week">
                <p>{t("week.Mo")}</p>
                <p>{t("week.Tu")}</p>
                <p>{t("week.We")}</p>
                <p>{t("week.Th")}</p>
                <p>{t("week.Fr")}</p>
                <p>{t("week.Sa")}</p>
                <p>{t("week.Su")}</p>
            </div>
            <div className="days">
                {
                   lastDateOfMonth()
                }
                <p>{days}</p>
            </div>
        </div>
    )
}

export default MonthCalendar;