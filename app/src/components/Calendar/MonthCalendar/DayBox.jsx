import React, {useEffect, useState, useRef} from "react";
import { useTranslation } from "react-i18next";

const DayBox = ({dayNumber, active, events}) => {

    const [fullDatum, setFullDatum] = useState([]);
    const [topPosition, setTopPosition] = useState(30);
    const nextValueParagraph = useRef(null);

    const { t } = useTranslation();

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
        const className = "today bgdrbl clwt";
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

        let nextEvent = 0;

        const eventElements = events.slice(1).map((event, index) => {
            if(index < 2){
                 return <p key={index} style={{top: `${topPosition + index * 23}px`}} className={`event clwt anop ${event.color}`}>{event.title}</p>
            } else if(index === 2) {
                nextEvent++;
                return <p key={index} style={{top: `${topPosition + index * 23}px`}} className={`next-events event cldrbl anop`} ref={nextValueParagraph}>{t("notification.more")} {nextEvent}</p>
            } else {
                if(nextValueParagraph.current){
                    nextEvent++;
                    nextValueParagraph.current.innerHTML = `${t("notification.more")} ${nextEvent}`;
                }
                return null;
            }
        });

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