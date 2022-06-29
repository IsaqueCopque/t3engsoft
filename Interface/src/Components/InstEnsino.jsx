import { useState } from "react";
import Header from "./Header";
import style from './InstEnsino.module.css';

const InstEnsino = ({token, setToken}) => {
    const [op, setOp] = useState(0);
    const [data, setData] = useState({});

    const DirigentePanel = () => (
        <div className={style["wrapper"]}>
            <div className="card">
                Teste
            </div>
        </div>
    );
    const DiretorPanel = () => {
        if(op === 1){
            return(
                <div className={style["wrapper"]}>Op1</div>
            )
        }
        if(op === 2){
            return(
                <div className={style["wrapper"]}>Op2</div>
            )
        }
    };

    const FuncionarioPanel = () => {
        if(op === 1){
            return(
                <div className={style["wrapper"]}>Op1</div>
            )
        }
        if(op === 2){
            return(
                <div className={style["wrapper"]}>Op2</div>
            )
        }
    };

    return(
        <>
        <Header 
        setOp={setOp}
        token={token}
        setToken={setToken}
        />
        <FuncionarioPanel/>
        </>
    );
};

export default InstEnsino;