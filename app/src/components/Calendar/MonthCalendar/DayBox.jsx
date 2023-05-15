import React, {useEffect, useState} from "react"

const DayBox = ({dayNumber, active, events}) => {

    const [fullDatum, setFullDatum] = useState([]);

    useEffect(() => {
        if(events){
            setFullDatum(events[0]);
        }
    }, [events])

    const isToday = (date) => {
        const todayDate = new Date().toISOString().slice(0, 10);
        return(todayDate === date);
    }

    const getClassNameToday = () => {
        const className = "today bggr clwt";
        if(isToday(fullDatum)){
            return className;
        } else{
            return;
        }
    }

    const createEventsBox = () => {
        if (!events || events.length <= 1) {
          return null;
        }
        const eventElements = events.slice(1).map((event, index) => (
            <p key={index} className="event bggr clwt angd">{event.title}</p>
        ));
        return <>{eventElements}</>;
    };


    if(active === "true"){
        return(
            <div className="day-box active">
                <p className={getClassNameToday()}>{dayNumber}</p>
                {createEventsBox()}
                <p className="add-record clgry">+</p>
            </div>
        )
    } else{
        return(
            <div className="day-box non-active">
                <p className="clgry">{dayNumber}</p>
            </div>
        )
    }
}

export default DayBox;