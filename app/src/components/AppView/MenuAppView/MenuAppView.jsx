import React, {useContext, useState, useEffect} from "react";
import './MenuAppView.css';
import { DataContext } from "../../../views/Application";
import Icon from './icon';
import settingIcon from '../../../assets/images/icon-setting-2.png';
import settingIconHover from '../../../assets/images/icon-setting-hover.png';
import notificationIcon from '../../../assets/images/icon-notification.png';
import notificationIconHover from '../../../assets/images/icon-notification-hover.png';
import { getImage } from "../../../utils/getImage";
import { useTranslation } from "react-i18next";
import  userDefImage  from "../../../assets/images/userIcon/icon-user-fox.png";


const MenuAppView = () => {
    const { t } = useTranslation();

    const userData = useContext(DataContext);
    const [userImage, setUserImage] = useState(userDefImage);

    useEffect(() => {
        if(userData.icon){
            setUserImage(getImage(userData.icon, "image/png"));
        }
    }, [userData.icon])

    const firstIcon = {type: "icon", setNotification: "true", notification: 10, icon: notificationIcon, iconHover: notificationIconHover, avatar: "false"}; // TODO Vyresit notifikaci, aby se brala ze serveru
    const secondIcon = {type: "icon", setNotification: "false", icon: settingIcon, iconHover: settingIconHover, avatar: "false"};
    const thirdIcon = {type: "img", setNotification: "false", icon: userImage, avatar: "true"};

    return(
        <div className="app-view-menu">
            <div>
                <h1 className="cldrbl ">{t("notification.greetings")}, {userData.name}</h1>
            </div>
            <div className='app-view-icons'>
                <Icon {...firstIcon}/>
                <Icon {...secondIcon} />
                <Icon {...thirdIcon}/>
            </div>
        </div>
    )
}

export default MenuAppView;