import React from "react";
import styles from './Panel.module.css';

const LoginPanel = ({setCookie, setLogin, api}) => {

    const [errorMsg, setError] = React.useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const res = await api.post('login', {"email":e.target[0].value, "senha":e.target[1].value});
            setCookie("token",res.data.token);
            setCookie("cargo",res.data.cargo);
        }catch(e){console.log(e);setError(e.response.data)}     
    };

    const LoginPg = (
        <div className={`${styles["wrapper"]} ${"gradblue"}`}>
            <div className={"card"}>

                <div className={styles["welcome"]}>
                    <div className={styles["welcome-message"]}>
                    <h2>Bem Vindo!</h2>
                    <p>Faça login em sua conta para ter acesso a sua instituição de ensino.</p>
                    </div>
                    <div className={"img-circle instit-img"}/>
                </div>

                <div className={styles["login"]}>
                    <p className="error-txt">{errorMsg}</p>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleSubmit(e)}>
                        <section className={styles['form-section']}>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"}/>
                        </section>
                        <section className={styles['form-section']}>
                        <label htmlFor={"senha"}>Senha</label>
                        <input name={"senha"} type={"password"}></input>
                        </section>
                        <input type={"submit"} value={"Entrar"}></input>                
                    </form>
                    <small className="underlink">Esqueceu a senha?</small>
                </div>

                <p className="underlink" onClick={()=>setLogin(false)}>Ou cadastre sua instituição.</p>
            </div>
        </div>
    );

    return LoginPg;
};

export default LoginPanel;