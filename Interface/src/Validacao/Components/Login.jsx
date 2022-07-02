import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import styles from './Login.module.css';

const Login = ({setToken}) => {

    const inst = useParams().inst;
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target[0].value);
        // console.log(e.target[1].value);

        if(inst=="validacao")
            setToken({auth:true, inst: false, level: "funcionario", username:"NameUs"});
        else
            setToken({auth:true, inst: true, level: "funcionario", username:"NameUs"});
        navigate("/", {replace: true});
    };

    const LoginPg = (
        <div className={`${styles["wrapper"]} ${inst === "validacao"? "gradgreen" : "gradblue"}`}>
            <div className={"card"}>

                <div className={styles["welcome"]}>
                    <div className={styles["welcome-message"]}>
                    <h2>Bem Vindo!</h2>
                    <p>Faça login em sua conta para ter acesso a sua <u>instituição{inst === "validacao"? " validadora" : ""}</u>.</p>
                    </div>
                    {inst == "validacao"? <div className={"img-circle valida-img"}/> : <div className={"img-circle instit-img"}/>}
                </div>

                <div className={styles["login"]}>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleSubmit(e)}>
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
                    <small>Esqueceu a senha?</small>
                </div>

            </div>
        </div>
    );

    return LoginPg;
};

export default Login;