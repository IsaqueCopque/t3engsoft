import { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import styles from "./styles.module.css";

const Instituicao = ({api}) => {

    const [inst, setInst] = useState({});
    const [edit, setEdit] = useState(false);
    const [errorMsg, setError] = useState(''); 

    useEffect(()=>{
        async function getInst(){
            try{
                const res = await api.get("/inst");
                if(res.data) setInst(res.data);
            }catch(e){console.log(e);}
        }
    getInst()},[setInst])

    const handleRegister = async(e) => {
        e.preventDefault(); 
        try{
            const res = await api.post('/inst',
            {
                "nome":e.target[0].value, 
                "endereco":e.target[1].value, 
                "mec":e.target[2].value, 
                "mantenedora":e.target[3].value
            });
            setInst(res.data);
            window.location.reload();
        }catch(e){console.log(e);setError(e.response.data)}
    }

    const handleUpdate = async(e) => {
        e.preventDefault(); 
        try{
            const res = await api.put('/inst',
            {
                "nome":e.target[0].value, 
                "endereco":e.target[1].value, 
                "mec":e.target[2].value, 
                "mantenedora":e.target[3].value
            });
            setInst(res.data);
            window.location.reload();
        }catch(e){console.log(e);setError(e.response.data)}
    }

    const InstCard = () => {
        if(!Object.keys(inst).length){
            return(
                <div>
                    <h3>Registre sua instituicao</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleRegister(e)}>
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
                        <input name={"mec"} type={"text"}></input>
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

        if(edit){
            return(
                <div>
                    <h3>Atualize sua instituicao</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleUpdate(e)}>
                         <p className="error-txt">{errorMsg}</p>
                        <section className={styles['form-section']}>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"} defaultValue={inst.nome}/>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"endereco"}>Endereço</label>
                        <input name={"endereco"} type={"text"} defaultValue={inst.endereco}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mec"}>Mec</label>
                        <input name={"mec"} type={"text"} defaultValue={inst.mec}></input>
                        </section>

                        <section className={styles['form-section']}>
                        <label htmlFor={"mantenedora"}>Mantenedora</label>
                        <input name={"mantenedora"} type={"text"} defaultValue={inst.mantenedora}></input>
                        </section>

                        <input type={"submit"} value={"Atualizar"}></input>                
                    </form>
                </div>
            )
        }

        return(
            <div className={"card"}>
                <h2>Dados da instituicão</h2>
                <h4>{`Nome: ${inst.nome}`}</h4>
                <h4>{`Endereço: ${inst.endereco}`}</h4>
                <h4>{`Mec: ${inst.mec}`}</h4>
                <h4>{`Mantenedora: ${inst.mantenedora}`}</h4>
                <hr/>
                <div className={styles["edit-div"]} onClick={()=>setEdit(true)}>
                    <FiEdit size={"2em"}/>
                    <p>Editar</p>
                </div>
            </div>
        )
    }

    return (<InstCard/>);
};

export default Instituicao;