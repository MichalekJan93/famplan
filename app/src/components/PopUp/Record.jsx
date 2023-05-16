const Record = (props) => {

    const form = (style) => {

    }

    return(
        <div className="popup-record">
            <div className="popup-close"></div>
            <p className="title">{props.title}</p>
            {form(props.style)}
            <div className="popup-control">
                <button className="popup-btn delete">{props.delete}</button>
                <button className="popup-btn confirm">{props.confirm}</button>
            </div>
        </div>
    )
}

export default Record;