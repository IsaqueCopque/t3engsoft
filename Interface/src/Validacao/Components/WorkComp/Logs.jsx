import { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Logs = ({api}) => {
    
    const [logs, setLogs] = useState({});

    useEffect(()=>{
        async function getLogs(){
            try{
                const res = await api.get("/logs");
                if(res.data) setLogs(res.data);
            }catch(e){console.log(e);}
        }
    getLogs()},[setLogs]);


    if(Object.keys(logs).length){
        return(
            <div className={styles["map-container"]}>
                {
                    logs.map((log) => (
                        <div className={styles["user-card"]} key={log.id}>
                            <h4>{`ID do autor: ${log.id}`}</h4>
                            <h5>{`Data: ${log.data}`}</h5>
                            <h5>Ação:</h5>
                            <p>{log.acao}</p>
                        </div>
                    ))
                }
            </div>
        )
    }

    return(<h3>Sem registros de atividades.</h3>)
};

export default Logs;