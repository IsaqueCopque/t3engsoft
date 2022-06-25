import { useState } from "react";
import Header from "./Header";
import style from './InstValida.module.css';

const InstValida = ({token, setToken}) => {
    const [op, setOp] = useState("");

    
    const CoordenadorPanel = () => (
        <div className={style["wrapper"]}>
            <div className="card">
                Teste
            </div>
        </div>
    );
    const SuperintPanel = () => {
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
        <Header 
        setOp={setOp}
        token={token}
        setToken={setToken}
        />
    );
};

export default InstValida;