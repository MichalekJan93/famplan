const DayBox = ({dayNumber, active, events}) => {

    console.log(dayNumber, events)

    if(active === "true"){
        return(
            <div className="day-box active">
                <p>{dayNumber}</p>
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