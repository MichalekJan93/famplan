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

    /**
     * Function for findings first day in Month. EN -> first day Sunday (return 0)
     * @returns {number} Number first day in Month
     */
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

    /**
     * Function for findings last date in actually month
     * @returns {number} last date in actually month
     */
    const lastDateOfMonth = () => {
        return new Date(currentYear, currentMonth, 0).getDate();
    }

    /**
     * Function for findings last date in last month
     * @returns {number} last date in last month
     */
    const lastDateOfLastMonth = () => {
        return new Date(currentYear, currentMonth - 1, 0).getDate();
    }

    /**
     * Function for findings last day in actually month
     * @returns {number} last day in actually month
     */
    const lastDayOfLastMonth = () => {
        return new Date(currentYear, currentMonth - 1, 0).getDay();
    }

    /**
     * Function for control calendar
     * @param {String} operation left or right
     * @returns 
     */
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

    /*  Function set all days in actually month in useState actuallyMonthDays */
    const createArrayActuallyMonthDays = () => {
        let days = [];
        for( let i = 1; i <= lastDateOfMonth(); i++ ){
            days.push(i);
        }
        setActuallyMonthDays(days);
    }

    /* Function set all days in next month in useState nextMonthDays */
    const createArrayNextMonthDays = () => {
        let days = [];
        for(let i = 1; i <= 8 - firstDayOfMonth(); i++){
            days.push(i)
        }
        setNextMonthDays(days)
    }

    /* Function set all days in last month in useState lastMonthDays */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentMonth, currentYear]);

    /**
     * The function finds events for the current date from the useContext userData
     * @param {String} date 
     * @returns events
     */
    const findEvents = (date) => {
        let day = date < 10 ? "0" + date : date;
        let month = currentMonth < 10 ? "0" + currentMonth : currentMonth;
        let fullDate = `${currentYear}-${month}-${day}`;
        let events = [fullDate];
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
                <div className="date-box">
                    <button className="btn-control" id="left" onClick={() => {controlCalendar("left")}}></button>
                    <p className="year-with-months">{t("monthsCalendar." + currentMonth) + " " + currentYear}</p>
                    <button className="btn-control" id="right" onClick={() => {controlCalendar("right")}}></button> 
                </div>
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