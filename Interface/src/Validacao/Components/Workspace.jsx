//Superint: 1 instituicao, 2 usuários, 3 Parceiros
//Dirigente: 1 Parceiros
//Coordenador: 1 Atividades
//Funcionar: 1 Solicitacoes

import Instituicao from "./WorkComp/Instituicao";
import Usuarios from "./WorkComp/Usuarios";
import Parceiros from "./WorkComp/Parceiros";
import Logs from "./WorkComp/Logs";
import Solicitacoes from "./WorkComp/Solicitacoes";
import styles from './WorkComp/styles.module.css';

const Workspace = ({op, cookies, api}) => {
    const Content = () => {
        if(cookies.cargo === '1'){
            switch(op){
                case 1: return <Instituicao api={api}/>
                case 2: return <Usuarios api={api} uid={cookies.uid}/>
                case 3: return <Parceiros api={api} cargo={cookies.cargo}/>
            }
        }else if(cookies.cargo === '2'){
            if(op === 1) return <Parceiros api={api} cargo={cookies.cargo}/>
        }else if(cookies.cargo === '3'){
            if(op === 1) return <Logs api={api}/> 
        }else if(cookies.cargo === '4'){
            if(op === 1) return <Solicitacoes api={api}/>
        }
    }

    return (
        <div className={styles["wrapper"]}>
           <Content />
        </div>
    );
};

export default Workspace;