import logo from '../../assets/images/famplan-logo.png'
import '../../styles/Menu.css'

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