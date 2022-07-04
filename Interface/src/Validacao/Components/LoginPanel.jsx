import React from "react";
import styles from './Panel.module.css';

const LoginPanel = ({setCookie, setLogin, api}) => {

    const [errorMsg, setError] = React.useState(''); 
    const [newSenha, setNewSenha] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const res = await api.post('/login', {"email":e.target[0].value, "senha":e.target[1].value});
            setCookie("token",res.data.token);
            setCookie("cargo",res.data.cargo);
            setCookie("uid",res.data.uid);
        }catch(e){console.log(e);setError(e.response.data)}     
    };

    const handleChange = async (e) => {
        e.preventDefault();
        try{
            await api.post("/login/change", {"email":e.target[0].value, "senha":e.target[1].value});
            setNewSenha(false);
            window.location.reload();
        }catch(e){console.log(e);window.location.reload();}    
    }

    const LoginPg = (
        <div className={`${styles["wrapper"]} ${"gradgreen"}`}>
            <div className={"card"}>
            {newSenha?
                <>
                    <p>Faz de conta que você recebeu um email para troca de senha.</p>
                    <form className={styles['log-form']} onSubmit={(e)=>handleChange(e)}>
                    <section className={styles['form-section']}>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"} id="email-inpt"/>
                    </section>
                    <section className={styles['form-section']}>
                        <label htmlFor={"senha"}>Nova senha</label>
                        <input name={"senha"} type={"password"}/>
                    </section>
                    <input type={"submit"} value={"Alterar senha"}></input>               
                    </form>
                </>
                :
                <>
                <div className={styles["welcome"]}>
                    <div className={styles["welcome-message"]}>
                    <h2>Bem Vindo!</h2>
                    <p>Faça login em sua conta para ter acesso a sua instituição de validação.</p>
                    </div>
                    <div className={"img-circle valida-img"}/>
                </div>

                <div className={styles["login"]}>
                    <p className="error-txt">{errorMsg}</p>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleSubmit(e)}>
                        <section className={styles['form-section']}>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"} id="email-inpt"/>
                        </section>
                        <section className={styles['form-section']}>
                        <label htmlFor={"senha"}>Senha</label>
                        <input name={"senha"} type={"password"}></input>
                        </section>
                        <input type={"submit"} value={"Entrar"}></input>                
                    </form>
                    <small className="underlink" onClick={(e)=>setNewSenha(e)}>Esqueceu a senha?</small>
                </div>

                <p className="underlink" onClick={()=>setLogin(false)}>Ou cadastre sua instituição.</p>
                </>
            }
            </div>
        </div>
    );

    return LoginPg;
};

export default LoginPanel;