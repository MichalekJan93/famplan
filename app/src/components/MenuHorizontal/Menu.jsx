/**
 * COMPONENT Menu
 * Component for creating horizontal menu
 * MIJN 230424 - Created component
 */

import logo from '../../assets/images/famplan-logo.png'
import './Menu.css'

const Menu = () => {
    return(
        <header>
            <a className="logo" href="#"> {/* //TODO */}
                <img src={logo} alt="Famplan logo" />
                <p>FamPlan</p>
            </a>
        </header>
    )
}

export default Menu;