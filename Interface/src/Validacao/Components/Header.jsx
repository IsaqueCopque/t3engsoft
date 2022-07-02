import style from './Header.module.css';
import { MdLogout, MdAccountCircle } from 'react-icons/md'

const Header = ({setOp, token, setToken}) => {

    const DiretorOp = () => (
        <div className={style["options"]}>
            <div className={style["option"]}
            onClick={()=>setOp(1)}>
                Instituição
            </div>
            <div className={style["option"]}
             onClick={()=>setOp(2)}>
                Usuários
            </div>
        </div>
    );
    const SuperintOp = () => (
        <div className={style["options"]}>
            <div className={style["option"]}
             onClick={()=>setOp(1)}>
                Instituições
            </div>
            <div className={style["option"]}
             onClick={()=>setOp(2)}>
                Usuários
            </div>
        </div>
    );
    const FuncionarioOp = () => {
        if(token.inst){
            return(
                <div className={style["options"]}>
                <div className={style["option"]}
                 onClick={()=>setOp(1)}>
                    Cursos
                </div>
                <div className={style["option"]}
                 onClick={()=>setOp(2)}>
                    Validação
                </div>
                </div>
            )
        }else{
            return(
                <div className={style["options"]}>
                    <div className={style["option"]}
                     onClick={()=>setOp(1)}>
                        Validações
                    </div>
                </div>
            )
        }
    };

    const UserOp = () => {
        switch(token.level){
            case 'funcionario':
                return <FuncionarioOp/>;
                break;
            case 'diretor':
                return <DiretorOp/>;
                break;
            case 'superintendente':
                return <SuperintOp/>;
                break;
        }
    }

    const header = (
        <div className={`
        ${token.inst? style["blue-back"] : style["green-back"] } ${style["header"]}
        `}>
            <UserOp/>

            <div className={style["options"]}>
                <div className={style["user-logout"]}>
                    <MdAccountCircle size={"2em"}/>
                    <p>{token.username}</p>
                </div>
                <div className={`${style["logout"]} ${style["user-logout"]}`}
                onClick={()=>{setToken({}); }}>
                        <MdLogout size={"2em"}/>
                        <p>Sair</p>
                </div>
            </div>
        </div>
    )
    return header;
};

export default Header;

/*<div className={style["options"]}>
                <div className={style["option"]}>
                    Validar
                </div>
                <div className={style["option"]}>
                    Validações
                </div>
            </div>*/