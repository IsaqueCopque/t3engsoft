import styles from './Login.module.css';
import {Link} from "react-router-dom";

const Login = ({instV}) => {
    const LoginPg = (
        <div className={`${styles["wrapper"]} ${instV? "gradgreen" : "gradblue"}`}>
            <div className={"card"}>

                <div className={styles["welcome"]}>
                    <div className={styles["welcome-message"]}>
                    <h2>Bem Vindo!</h2>
                    <p>Faça login em sua conta para ter acesso a sua <u>instituição{instV? " validadora" : ""}</u>.</p>
                    </div>
                    {instV? <div className={"img-circle valida-img"}/> : <div className={"img-circle instit-img"}/>}
                </div>

                <div className={styles["login"]}>
                    <form className={styles['log-form']}>
                        <section>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"}/>
                        </section>
                        <section>
                        <label htmlFor={"senha"}>Senha</label>
                        <input name={"senha"} type={"password"}></input>
                        </section>
                        <input type={"submit"} value={"Entrar"}></input>                
                    </form>
                    <small><Link to='/'>Esqueceu a senha?</Link></small>
                </div>

            </div>
        </div>
    );

    return LoginPg; 

};

export default Login;