import Menu from "../components/MenuHorizontal/Menu"
import RegistrationForm from "../components/forms/RegistrationForm"
import '../styles/Registration.css'

const Registration = () => {
    return(
        <div>
            <Menu />
            <div className="center-box">
                <RegistrationForm />
            </div>
        </div>
    )
}

export default Registration;