import { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import {MdOutlineAdd} from 'react-icons/md';
import { AiOutlineUserDelete } from 'react-icons/ai';
import {TbLock} from 'react-icons/tb';
import {TbLockOpen} from 'react-icons/tb';
import styles from "./styles.module.css";

const Parceiros = ({cargo, api}) => {
    
    const [parceiros, setParceiros] = useState([]);
    const [edit, setEdit] = useState(false);
    const [cad, setCad] = useState(false);
    const [errorMsg, setError] = useState(''); 

    useEffect(()=>{
        async function getParceiros(){
            try{
                var route;
                cargo === "1"? route = "/parceiros" : route = "/parceiros/dirigente";
                const res = await api.get(route);
                if(res.data) setParceiros(res.data);
            }catch(e){console.log(e);}
        }
    getParceiros()},[setParceiros])


    const handleUpdate = async(e) => {
        e.preventDefault(); 
        try{
            await api.put(`/parceiros/${edit.id}`,
            {
                "nome":e.target[0].value, 
                "endereco":e.target[1].value, 
                "mec":e.target[2].value, 
                "mantenedora":e.target[3].value
            });
            setEdit(false);
            window.location.reload();
        }catch(e){console.log(e);setError(e.response.data)}
    }

    const handleCad = async(e) => {
        e.preventDefault(); 
        try{
            await api.post('/parceiros',
            {
                "nome":e.target[0].value, 
                "endereco":e.target[1].value, 
                "mec":e.target[2].value, 
                "mantenedora":e.target[3].value
            });
            setCad(false);
            window.location.reload();
        }catch(e){console.log(e);setError(e.response.data)}
    }

    const handleAcess = async(e) => {
        e.preventDefault(); 
        try{
            api.put(`/parceiros/acesso/${edit.id}`,{"acesso": !edit.acesso});
            setEdit(false);
            window.location.reload();
        }catch(e){}
    }

    const handleDel = async(e) => {
        e.preventDefault(); 
        try{
            api.delete(`/parceiros/${edit.id}`);
            setEdit(false);
            window.location.reload();
        }catch(e){}
    }
    
    const Content = () => {
        if(edit){
            return(
                <div>
                 <h3>Atualize a instituição parceira</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleUpdate(e)}>
                         <p className="error-txt">{errorMsg}</p>
                        <section className={styles['form-section']}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"} defaultValue={edit.nome}/>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"endereco"}>Endereço</label>
                        <input name={"endereco"} type={"text"} defaultValue={edit.endereco}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mec"}>Mec</label>
                        <input name={"mec"} type={"text"} defaultValue={edit.mec}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={edit.mantenedora}></input>
                        </section>

                        <input type={"submit"} value={"Atualizar"}></input>                
                    </form>
                    <div className={styles["edit-div"]} onClick={(e)=>handleDel(e)}>
                        <AiOutlineUserDelete size={"2em"}/>
                        <p>Deletar</p>
                    </div>
                    <div className={styles["edit-div"]} onClick={(e)=>handleAcess(e)}>
                        {edit.acesso? 
                            <>
                            <TbLock size={"2em"}/>
                            <p>Bloquear</p>
                            </>
                            :
                            <>
                            <TbLockOpen size={"2em"}/>
                            <p>Liberar</p>
                            </>
                        }   
                    </div>
            </div>
            )
        }
        if(cad){
            return(
                <div>
                 <h3>Cadastre a instituição parceira</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleCad(e)}>
                         <p className="error-txt">{errorMsg}</p>
                        <section className={styles['form-section']}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"}/>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"endereco"}>Endereço</label>
                        <input name={"endereco"} type={"text"}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mec"}>Mec</label>
                        <input name={"mec"} type={"text"} ></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"}></input>
                        </section>

                        <input type={"submit"} value={"Cadastrar"}></input>                
                    </form>
            </div>
            )
        }
        if(parceiros.length){
            return(
                <div className={styles["map-container"]}>
                    {parceiros.map( parceiro => 
                        <div className={"card"} key={parceiro.id}>
                            <h4>{`Nome: ${parceiro.nome}`}</h4>
                            <h4>{`Endereço: ${parceiro.endereco}`}</h4>
                            <h4>{`Mec: ${parceiro.mec}`}</h4>
                            <h4>{`Mantenedora: ${parceiro.mantenedora}`}</h4>
                            {cargo === "1"? <h4>{`Acesso: ${parceiro.acesso? "Liberado" : "Negado"}`}</h4> : <></>}
                            <hr/>
                            {cargo === "1"? 
                                <div className={styles["edit-div"]} onClick={()=>setEdit(parceiro)}>
                                    <FiEdit size={"2em"}/>
                                    <p>Editar</p>
                                </div>
                                :
                                <></>
                            }
                        </div>
                    )}
                </div>
            )
        }
        else{
            return(
              <div>  
                <h3>Nenhuma instituicão de validação cadastrada.</h3>
             </div>
            )
        }
    }

    return (
        <div className={styles["sub-wrapper"]}>
        {cargo === '2'?  
            <div className={`${styles["edit-div"]} ${styles["sub-header"]}`} onClick={()=>setCad(true)}>
                <MdOutlineAdd size={"2em"}/>
                <p>Adicionar parceiro</p>
            </div>
            :
            <></>
        }
        <Content/>
        </div>
    );
}

export default Parceiros;