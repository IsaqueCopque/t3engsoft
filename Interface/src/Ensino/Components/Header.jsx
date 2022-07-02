import style from './Header.module.css';
import { MdLogout, MdAccountCircle } from 'react-icons/md'

const Header = ({setOp, cargo, removeCookie}) => {

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
            <div className={style["option"]}
             onClick={()=>setOp(3)}>
                Atividades
            </div>
        </div>
    );
    const DirigenteOp = () => (
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
    };

    const UserOp = () => (
        <>
            {cargo === '1'? <DiretorOp/> : (cargo === 2? <DirigenteOp/> : <FuncionarioOp/>)}
        </>
    )

    const CargoNome = () => (
        <p>{
            cargo === '1'? "Diretor" : (cargo === '2' ? "Dirigente" : "Funcionário") 
            }
        </p>
    )

    const header = (
        <div className={`${style["blue-back"]} ${style["header"]} `}>
            <UserOp/>

            <div className={style["options"]}>
                <div className={style["user-logout"]}>
                    <MdAccountCircle size={"2em"}/>
                    <CargoNome />
                </div>
                <div className={`${style["logout"]} ${style["user-logout"]}`}
                onClick={()=>{removeCookie("cargo"); removeCookie("token") }}>
                        <MdLogout size={"2em"}/>
                        <p>Sair</p>
                </div>
            </div>
        </div>
    )
    return header;
};

export default Header;