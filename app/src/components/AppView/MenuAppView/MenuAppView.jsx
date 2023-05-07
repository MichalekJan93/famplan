import React, {useContext} from "react";
import './MenuAppView.css';
import { DataContext } from "../../../views/Application";
import Icon from './icon';
import settingIcon from '../../../assets/images/icon-setting-2.png';
import settingIconHover from '../../../assets/images/icon-setting-hover.png';
import notificationIcon from '../../../assets/images/icon-notification.png';
import notificationIconHover from '../../../assets/images/icon-notification-hover.png';
import { getImage } from "../../../utils/getImage";
import { useTranslation } from "react-i18next";


const MenuAppView = () => {

    const { t } = useTranslation();

    const userData = useContext(DataContext);
    const firstIcon = {type: "icon", setNotification: "true", notification: 10, icon: notificationIcon, iconHover: notificationIconHover, avatar: "false"};
    const secondIcon = {type: "icon", setNotification: "false", icon: settingIcon, iconHover: settingIconHover, avatar: "false"};
    const thirdIcon = {type: "img", setNotification: "false", icon: userData.icon && getImage(userData.icon, "image/png"), avatar: "true"};

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