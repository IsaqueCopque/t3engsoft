import { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import {MdOutlineAdd} from 'react-icons/md';
import styles from "./styles.module.css";

const Validador = ({cargo, api}) => {
    
    const [validador, setValidador] = useState({});
    const [edit, setEdit] = useState(false);
    const [cad, setCad] = useState(false);
    const [errorMsg, setError] = useState(''); 


    useEffect(()=>{
        async function getValidador(){
            try{
                var route;
                cargo === "1"? route = "/validador/diretor" : route = "/validador";
                const res = await api.get(route);
                if(res.data) setValidador(res.data);
            }catch(e){console.log(e);}
        }
    getValidador()},[setValidador])


    const handleUpdate = async(e) => {
        e.preventDefault(); 
        try{
            await api.put('/validador',
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
            await api.post('/validador',
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

    const Content = () => {
        if(edit){
            return(
                <div>
                 <h3>Atualize a instituição validadora</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleUpdate(e)}>
                         <p className="error-txt">{errorMsg}</p>
                        <section className={styles['form-section']}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"} defaultValue={validador.nome}/>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"endereco"}>Endereço</label>
                        <input name={"endereco"} type={"text"} defaultValue={validador.endereco}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mec"}>Mec</label>
                        <input name={"mec"} type={"text"} defaultValue={validador.mec}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={validador.mantenedora}></input>
                        </section>

                        <input type={"submit"} value={"Atualizar"}></input>                
                    </form>
            </div>
            )
        }
        if(cad){
            return(
                <div>
                 <h3>Cadastre a instituição validadora</h3>
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
        if(Object.keys(validador).length){
            return(
                <div className={"card"}>
                <h2>Dados da instituicão</h2>
                <h4>{`Nome: ${validador.nome}`}</h4>
                <h4>{`Endereço: ${validador.endereco}`}</h4>
                <h4>{`Mec: ${validador.mec}`}</h4>
                <h4>{`Mantenedora: ${validador.mantenedora}`}</h4>
                <hr/>
                {cargo === "1"? 
                    <div className={styles["edit-div"]} onClick={()=>setEdit(true)}>
                        <FiEdit size={"2em"}/>
                        <p>Editar</p>
                    </div>
                    :
                    <></>
                }
            </div>
            )
        }
        else{
            return(
              <div>  
                <h3>Nenhuma instituicão de validação cadastrada.</h3>
                {cargo === "2"? 
                    <div className={[styles["edit-div"]]} onClick={()=>setCad(true)}>
                        <MdOutlineAdd size={"2em"}/>
                        <p>Adicionar validador</p>
                    </div>
                    :
                    <></>
                }
             </div>
            )
        }
    }

    return (
        <Content/>
    );
}

export default Validador;