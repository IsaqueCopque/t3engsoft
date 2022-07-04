//Diretor: 1 instituicao, 2 usuários, 3 Validador, 4 Atividades
//Dirigente: 1 Validador
//Funcionar: 1 Cursos 2 Solicitar validacao

import Instituicao from "./WorkComp/Instituicao";
import Usuarios from "./WorkComp/Usuarios";
import Validador from "./WorkComp/Validador";
import Logs from "./WorkComp/Logs";
import Cursos from "./WorkComp/Cursos";
import Solicitacao from "./WorkComp/Solicitacao";
import styles from './WorkComp/styles.module.css';

const Workspace = ({op, cookies, api}) => {
    const Content = () => {
        if(cookies.cargo === '1'){
            switch(op){
                case 1: return <Instituicao api={api}/>
                case 2: return <Usuarios api={api} uid={cookies.uid}/>
                case 3: return <Validador api={api} cargo={cookies.cargo}/>
                case 4: return <Logs api={api}/> 
            }
        }else if(cookies.cargo === '2'){
            switch(op){
                case 1: return <Validador api={api} cargo={cookies.cargo}/>
                // case 2: return <Logs api={api}/> 
            }
        }else if(cookies.cargo === '3'){
            switch(op){
                case 1: return <Cursos api={api}/>
                case 2: return <Solicitacao api={api}/>
            }
        }
    }

    return (
        <div className={styles["wrapper"]}>
           <Content />
        </div>
    );
};

export default Workspace;