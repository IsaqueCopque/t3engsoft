import { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import {MdOutlineAdd} from 'react-icons/md';
import {AiOutlineUserDelete } from 'react-icons/ai';
import styles from "./styles.module.css";

const Cursos = ({api}) => {

    const [cursos, setCursos] = useState([]);
    const [edit, setEdit] = useState(false);
    const [cad, setCad] = useState(false);
    const [errorMsg, setError] = useState(""); 

    useEffect(()=>{
        async function getCursos(){
            try{
                const res = await api.get("/cursos");
                if(res.data) setCursos(res.data);
            }catch(e){console.log(e);setError(e.response.data)}
        }
    getCursos()},[setCursos]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const req = {
                "nome": e.target[0].value,
                "grau": e.target[1].value,
                "emec": e.target[2].value,
                "autorizacao": e.target[3].value,
                "reconhecimento": e.target[4].value,
                "renovacao": e.target[5].value,
                "observacao": e.target[6].value,
            }
            await api.put(`/cursos/${edit.id}`,req);
            setEdit(false);
            window.location.reload();
        }catch(e){console.log(e); setError(e.response.data)}
    };

    const handleCad = async (e) => {
        e.preventDefault();
        try{
            const req = {
                "nome": e.target[0].value,
                "grau": e.target[1].value,
                "emec": e.target[2].value,
                "autorizacao": e.target[3].value,
                "reconhecimento": e.target[4].value,
                "renovacao": e.target[5].value,
                "observacao": e.target[6].value,
            }
            await api.post("/cursos",req);
            setCad(false);
            window.location.reload();
        }catch(e){console.log(e); setError(e.response.data)}
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            await api.delete(`/cursos/${edit.id}`);
            setEdit(false);
            window.location.reload();
        }catch(e){console.log(e); setError(e.response.data)}
    };

    const Content = () => {
        if(edit){
            return(
                <div>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleUpdate(e)}>
                         <p className="error-txt">{errorMsg}</p>
                        <section className={styles['form-section']}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"} defaultValue={edit.nome}/>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"endereco"}>Endereço</label>
                        <input name={"endereco"} type={"text"} defaultValue={edit.grau}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mec"}>Mec</label>
                        <input name={"mec"} type={"text"} defaultValue={edit.emec}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={edit.autorizacao}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={edit.reconhecimento}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={edit.renovacao}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Observação</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={edit.observacao}></input>
                        </section>

                        <input type={"submit"} value={"Atualizar"}></input>                
                    </form>
                    <div className={[styles["edit-div"]]} 
                        onClick={(e)=> handleDelete(e)}>
                            <AiOutlineUserDelete size={"2em"} />
                            <p>Deletar</p>
                    </div>
                </div>
            )
        }
        if(cad){
            console.log("CAD")
            return(
                <div>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleCad(e)}>
                         <p className="error-txt">{errorMsg}</p>
                        <section className={styles['form-section']}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"} />
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"grau"}>Grau</label>
                        <input name={"grau"} type={"text"} ></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"emec"}>Emec</label>
                        <input name={"emec"} type={"text"} ></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"autorizacao"}>Autorização</label>
                        <input name={"autorizacao"} type={"text"} ></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"reconhecimento"}>Reconhecimento</label>
                        <input name={"reconhecimento"} type={"text"} ></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"renovacao"}>Renovação</label>
                        <input name={"renovacao"} type={"text"} ></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"obs"}>Observação</label>
                        <input name={"obs"} type={"text"} ></input>
                        </section>

                        <input type={"submit"} value={"Cadastrar"}></input>                
                    </form>
                </div>
            )
        }
        if(cursos.length){
            return(
                <div className={styles["map-container"]}>
                    {cursos.map( curso =>
                        <div className={styles["map-card"]} key={curso.id}>
                            <h3>{`Nome: ${curso.nome}`}</h3>
                            <h4>{`Grau: ${curso.grau}`}</h4>
                            <h4>{`Emec: ${curso.emec}`}</h4>
                            <h4>{`Autorização: ${curso.autorizacao}`}</h4>
                            <h4>{`Reconhecimento: ${curso.reconhecimento}`}</h4>
                            <h4>{`Renovação: ${curso.renovacao}`}</h4>
                            {curso.observacao? <small>{`Observação: ${curso.observacao}`}</small> : <></>}
                            <div className={styles["edit-div"]} onClick={()=>setEdit(curso)}>
                                <FiEdit size={"2em"}/>
                                <p>Editar</p>
                            </div> 
                        </div>
                    )}
                </div>
                )
        }
        return(
            <h3>Sem cursos cadastrados.</h3>
        )
    }

    return(
        <div className={styles["sub-wrapper"]}>
        {!edit? 
            <div className={[styles["sub-header"]]} onClick={()=>setCad(true)}>
                <MdOutlineAdd size={"2em"}/>
                <p>Adicionar curso</p>
            </div>
            :
            <></>
        }
        <Content />
        </div>
    )

}

export default Cursos;