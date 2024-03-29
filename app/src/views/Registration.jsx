import Menu from "../components/MenuHorizontal/Menu"
import RegistrationForm from "../components/Forms/RegistrationForm"

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