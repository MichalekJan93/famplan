import Menu from "../components/MenuHorizontal/Menu"
import LoginForm from "../components/Forms/LoginForm"

const Login = () => {
    return(
        <div>
            <Menu />
            <div className="center-box">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;