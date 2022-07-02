import React from "react";
import styles from './Panel.module.css';

const RegisterPanel = ({setCookie, setLogin, api}) => {

    const [errorMsg, setError] = React.useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const req = {
                "nome": e.target[0].value,
                "cpf": e.target[1].value,
                "telefone": e.target[2].value,
                "email": e.target[3].value,
                "senha": e.target[4].value
            }
            var res = await api.post('login/register', req); //res.data.sucess == "Diretor criado."
            res = await api.post('login', {"email":req.email, "senha":req.senha})
            setCookie("token",res.data.token);
            setCookie("cargo",res.data.cargo);
        }catch(e){setError(e.response.data)}     
    };

    const RegisterPg = (
        <div className={`${styles["wrapper"]} ${"gradblue"}`}>
            <div className={"card"}>

                <div className={styles["welcome"]}>
                    <div className={styles["welcome-message"]}>
                    <h2>Cadastro</h2>
                    <p>Cadastre-se como diretor de sua instituição de ensino.</p>
                    </div>
                    <div className={"img-circle instit-img"}/>
                </div>

                <div className={styles["login"]}>
                    <p className="error-txt">{errorMsg}</p>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleSubmit(e)}>
                        <section className={styles["form-section"]}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"}></input>
                        </section>

                        <section className={styles["name-section"]}>
                        <section>
                        <label htmlFor={"cpf"}>Cpf</label>
                        <input name={"cpf"} type={"text"} inputMode={"numeric"} minLength={"11"}></input>
                        </section>
                        <section>
                        <label htmlFor={"telefone"}>Telefone</label>
                        <input name={"telefone"} type={"text"}></input>
                        </section>
                        </section>
                        
                        <section className={styles["form-section"]}>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"}/>
                        </section>

                        <section className={styles["form-section"]}>
                        <label htmlFor={"senha"}>Senha</label>
                        <input name={"senha"} type={"password"}></input>
                        </section>

                        <input type={"submit"} value={"Cadastrar"}></input>                
                    </form>
                </div>

                <p className="underlink" onClick={()=>setLogin(true)}>Ou faça login em sua conta.</p>
            </div>
        </div>
    );

    return RegisterPg;
};

export default RegisterPanel;