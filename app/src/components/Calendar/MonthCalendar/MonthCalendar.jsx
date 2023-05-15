import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import '../Calendar.css';
import DayBox from "./DayBox";
import { DataContext } from "../../../views/Application";

const MonthCalendar = () => {
    const date = new Date();
    const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
    const [currentMonth, setCurrentMonth] = useState(date.getMonth() + 1 );
    const [currentYear, setCurrentYear] = useState(date.getFullYear());

    const [actuallyMonthDays, setActuallyMonthDays] = useState([]);
    const [nextMonthDays, setNextMonthDays] = useState([]);
    const [lastMonthDays, setLastMonthDays] = useState([]);

    const userData = useContext(DataContext);

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
        return new Date(currentYear, currentMonth, 0).getDate();
    }

    const lastDateOfLastMonth = () => {
        return new Date(currentYear, currentMonth - 1, 0).getDate();
    }

    const lastDayOfLastMonth = () => {
        return new Date(currentYear, currentMonth - 1, 0).getDay();
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

    const createArrayActuallyMonthDays = () => {
        let days = [];
        for( let i = 1; i <= lastDateOfMonth(); i++ ){
            days.push(i);
        }
        setActuallyMonthDays(days);
    }

    const createArrayNextMonthDays = () => {
        let days = [];
        for(let i = 1; i <= 8 - firstDayOfMonth(); i++){
            days.push(i)
        }
        setNextMonthDays(days)
    }

    const createArrayLastMonthDays = () => {
        let days = [];
        for(let i = lastDayOfLastMonth(); i > 0; i--){
            const day = lastDateOfLastMonth() - i;
            days.push(day)
        }
        setLastMonthDays(days)
    }

    useEffect(() => {
        createArrayActuallyMonthDays();
        createArrayNextMonthDays();
        createArrayLastMonthDays();
    },[currentMonth, currentYear]);

    const findEvents = (date) => {
        let day = date < 10 ? "0" + date : date;
        let month = currentMonth < 10 ? "0" + currentMonth : currentMonth;
        let fullDate = `${currentYear}-${month}-${day}`;
        let events = [];
        if(userData._id){
            for(let i in userData.events){
                let eventOnlyDate = userData.events[i].date.split('T')[0];
                if(eventOnlyDate === fullDate){
                    events.push(userData.events[i]);
                } else{
                }
            }
            return events;
        } else {
            return;
        }    
    }

    return (
        <div className="month-calendar">
            <div className="date">
                <button className="btn-control" id="left" onClick={() => {controlCalendar("left")}}></button>
                <p className="year-with-months">{t("monthsCalendar." + currentMonth) + " " + currentYear}</p>
                <button className="btn-control" id="right" onClick={() => {controlCalendar("right")}}></button>
            </div>
            <div className="week">
                <p>{t("week.1")}</p>
                <p>{t("week.2")}</p>
                <p>{t("week.3")}</p>
                <p>{t("week.4")}</p>
                <p>{t("week.5")}</p>
                <p>{t("week.6")}</p>
                <p>{t("week.7")}</p>
            </div>
            <div className="days">
                {lastMonthDays.map(day => {
                    return <DayBox dayNumber={day} active="false" key={day}/>
                })}
                {actuallyMonthDays.map(day => {
                    const component = findEvents(day);
                    return <DayBox dayNumber={day} active="true" key={day} events={component}/>
                })}
                {nextMonthDays.map(day => {
                    return <DayBox dayNumber={day} active="false" key={day}/>
                })}
            </div>
        </div>
    )
}

export default MonthCalendar;