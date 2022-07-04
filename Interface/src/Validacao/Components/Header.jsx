import style from './Header.module.css';
import { MdLogout, MdAccountCircle } from 'react-icons/md'

const Header = ({setOp, cargo, removeCookie}) => {
    const SuperOp = () => (
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
                Parceiros
            </div>
        </div>
    );
    const DirigenteOp = () => (
        <div className={style["options"]}>
            <div className={style["option"]}
             onClick={()=>setOp(1)}>
                Parceiros
            </div>
        </div>
    );
    const CoordOp = () => {
        return(
            <div className={style["options"]}>
            <div className={style["option"]}
                onClick={()=>setOp(1)}>
                Atividades
            </div>
            </div>
        )
    };
    const FuncionarioOp = () => {
        return(
            <div className={style["options"]}>
            <div className={style["option"]}
                onClick={()=>setOp(1)}>
                Solicitacões
            </div>
            </div>
        )
    };

    const UserOp = () => {
        switch(cargo){
            case '1': return <SuperOp/>
            case '2': return <DirigenteOp/>
            case '3': return <CoordOp/>
            case '4': return <FuncionarioOp/>
        }
    }

    const CargoNome = () => (
        <p>{
            cargo === '1'? "Superintendente" : 
                (cargo === '2' ? "Dirigente" : 
                    (cargo === '3'? "Coordenador" : "Funcionário")) 
            }
        </p>
    )

    const header = (
        <div className={`${style["green-back"]} ${style["header"]} `}>
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