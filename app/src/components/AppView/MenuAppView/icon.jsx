import { useState, useEffect } from "react"

const Icon = (props) => {
    const [hover, setHover] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(()=>{
        setNotification(props.notification);
    }, [props.notification])

    const returnComponent = () => {
        if(props.setNotification === "true" && props.notification){
            return (
            <div className="view-menu-icon"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
                <div className="icon-image"
                style={{
                    backgroundImage: hover ? `url(${props.iconHover})` : `url(${props.icon})`
                }}
                ></div>
                <div className="icon-notification bgrd">
                    {notification && <p className="clwt">{notification}</p>}
                </div>
            </div>
            )
        } else if(props.setNotification === "false" && props.avatar === "true"){
            return (
                <div className="view-menu-icon avatar">
                    <div className="icon-image avatar"
                    style={{
                        backgroundImage: `url(${props.icon})`
                    }}
                ></div>
                </div>
            )
        } else{
            return (
                <div className="view-menu-icon"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                    <div className="icon-image"
                    style={{
                        backgroundImage: hover ? `url(${props.iconHover})` : `url(${props.icon})`
                    }}
                ></div>
                </div>
            )
        }
    }

    return returnComponent();
}

export default Icon;