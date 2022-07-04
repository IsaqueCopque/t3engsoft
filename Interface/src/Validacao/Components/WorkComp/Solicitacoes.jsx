import { useState, useEffect } from "react";
import {GrValidate} from 'react-icons/gr';
import {IoIosPaper} from 'react-icons/io';
import {AiOutlineClose, AiOutlineCloseSquare} from 'react-icons/ai';
import styles from "./styles.module.css";

const Solicitacoes = ({api}) => {

    const [solicitacoes, setSoli ] = useState([]);
    const [edit, setEdit] = useState(false);
    const [curso, setCurso] = useState(false);

    useEffect(()=>{
        async function getParceiros(){
            try{
                const res = await api.get("/validacoes");
                if(res.data) setSoli(res.data);
            }catch(e){console.log(e);}
        }
    getParceiros()},[setSoli])

    const handSelect = async (solicitacao) => {
        try{
            const c = await api.get(`/curso/${solicitacao.curso.emec}`);
            setEdit(solicitacao);
            setCurso(c.data);
        }catch(e){console.log(e)}
    }

    const handValida = async (e) => {
        try{
            e.preventDefault();
            await api.put(`/validacoes/${edit.id}`,{"status": "validado"});
            window.location.reload();
        }catch(e){console.log(e)}
    }
    const handRejeita = async (e) => {
        try{
            e.preventDefault();
            await api.put(`/validacoes/${edit.id}`,{"status": "rejeitado"});
            window.location.reload();
        }catch(e){console.log(e)}
    }

    const Content = () => {
        if(edit){
            return (
                <div className={"soli-container"}>
                    <AiOutlineCloseSquare size={"2em"} onClick={()=>{setCurso(false);setEdit(false)}}/>
                    <div className={"card"}>
                        <h4>{`Curso: ${edit.curso.nome} | Emec: ${edit.curso.emec}`}</h4>
                        <h4>{`Aluno: ${edit.aluno}`}</h4>
                        <h4>{`Data: ${edit.data}`}</h4>
                        <h4>{`Mec da instituição: ${edit.instvalida}`}</h4>
                    </div>

                    <h3>Informações do curso</h3>
                    {curso? 
                        <div className={"card"}>
                            <h4>{`Grau: ${curso.grau} `}</h4>
                            <h4>{`Autorização: ${curso.autorizacao}`}</h4>
                            <h4>{`Reconhecimento: ${curso.reconhecimento}`}</h4>
                            <h4>{`Renovacão: ${curso.renovacao}`}</h4>
                            {curso.observacao? <h6>{`Observação: ${curso.observacao}`}</h6> :<></>}
                        </div>
                        :
                        <div className={"card"}>
                            <p>A instituicao parceira não possui informações sobre o curso.</p>
                        </div>
                    }

                    <div className={styles["edit-div"]} onClick={(e)=>{handValida(e)}}>
                        <GrValidate size={"2em"} color={"green"}/>
                        <p>Validar</p>
                    </div>
                    <div className={styles["edit-div"]} onClick={(e)=>{handRejeita(e)}}>
                        <AiOutlineClose size={"2em"} color={"red"}/>
                        <p>Rejeitar</p>
                    </div>
                </div>
            )  
        }
        if(solicitacoes.length){
            return(
                <div className={styles["map-container"]}>
                    {solicitacoes.map( solicitacao => 
                        <div className={"card"} key={solicitacao.id}>
                            <h4>{`Curso: ${solicitacao.curso.nome} | Emec: ${solicitacao.curso.emec}`}</h4>
                            <h4>{`Aluno: ${solicitacao.aluno}`}</h4>
                            <h4>{`Data: ${solicitacao.data}`}</h4>
                            <h4>{`Mec da instituição: ${solicitacao.instvalida}`}</h4>
                            <hr/>
                            <div className={styles["edit-div"]} onClick={()=>handSelect(solicitacao)}>
                                <IoIosPaper size={"2em"}/>
                                <p>Verificar</p>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        return(
            <h3>Nenhuma solicitação pendente.</h3>
        )
        
    }

    return (<Content/>);
}

export default Solicitacoes;