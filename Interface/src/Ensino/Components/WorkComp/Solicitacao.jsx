import { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Solicitacao = ({api}) => {

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();
            const req = {
                "curso":{
                    "nome": e.target[0].value, 
                    "emec": e.target[1].value, 
                },
                "aluno": e.target[2].value, 
                "data": e.target[3].value, 
            }
            await api.post('/validacoes', req); 
            window.location.reload();
        }catch(e){console.log(e)}
    };

    return(
        <div>
            <h3>Solicitar validação</h3>
            <form className={styles['log-form']}
            onSubmit={(e)=>handleSubmit(e)}>

                <section className={styles['form-section']}>
                <label htmlFor={"nomecurso"}>Nome do curso</label>
                <input name={"nomecurso"} type={"text"}/>
                </section>

                <section className={styles['form-section']}>
                <label htmlFor={"emec"}>Emec do curso</label>
                <input name={"emec"} type={"text"}/>
                </section>

                <section className={styles['form-section']}>
                <label htmlFor={"aluno"}>Aluno</label>
                <input name={"aluno"} type={"text"}></input>
                </section>

                <section className={styles['form-section']}>
                <label htmlFor={"Data"}>Data</label>
                <input name={"Data"} type={"text"}></input>
                </section>

                <input type={"submit"} value={"Solicitar"}></input>                
            </form>
    </div>
    );
};

export default Solicitacao;