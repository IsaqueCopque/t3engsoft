import { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import styles from "./styles.module.css";

const Usuarios = ({api, uid}) => {

    const [usuarios, setUsuarios] = useState([]);
    const [cadMenu, setCadMenu] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [errorMsg, setError] = useState(''); 

    useEffect(()=>{
        async function getUsers(){
            try{
                const res = await api.get("/user");
                if(res.data) setUsuarios(res.data);
            }catch(e){console.log(e);}
        }
    getUsers()},[setUsuarios])

    const getCargo = (lvl) => {
        if(lvl === 4)
            return "Funcionário";
        if(lvl === 3)
            return "Coordenador";
        if(lvl === 2)
            return "Dirigente";
        return "Superintendente";
    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const req = {
                "nome": e.target[0].value,
                "cargo": e.target[1].value,
                "cpf": e.target[2].value,
                "telefone": e.target[3].value,
                "email": e.target[4].value,
            }
            await api.post('/user', req);
            setCadMenu(false);
            window.location.reload();
        }catch(e){setError(e.response.data)} //
    }

    const handleUpdate = async (e) => {
        try{
            e.preventDefault();
            const req = {
                "nome": e.target[0].value,
                "cargo": e.target[1].value,
                "cpf": e.target[2].value,
                "telefone": e.target[3].value,
                "email": e.target[4].value,
            }
            await api.put(`/user/${editUser.id}`, req);
            setEditUser(false);
            window.location.reload();
        }catch(e){}
    }
    
    const handleDelete = async (e) => {
        try{
            e.preventDefault();
            await api.delete(`/user/${editUser.id}`);
            setEditUser(false);
            window.location.reload();
        }catch(e){}
    }

    const ShowEdit = () => {
        return(
            <div>
                    <h3>Atualização de usuário</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleUpdate(e)}>
                        <section className={styles["name-section"]}>
                        <p className="error-txt">{errorMsg}</p>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"} defaultValue={editUser.nome}></input>
                        

                        <section className={styles["name-section"]}>
                            <label htmlFor={"cargo"}>Cargo</label>
                            <select name={"cargo"} defaultValue={editUser.cargo}>    
                                <option value={4}>Funcionário</option>
                                <option value={3}>Coordenador</option>
                                <option value={2}>Dirigente</option>
                                <option value={1}>Superintendente</option>
                            </select>
                        </section>

                        </section>

                        <section className={styles["name-section"]}>
                        <section>
                        <label htmlFor={"cpf"}>Cpf</label>
                        <input name={"cpf"} type={"text"} inputMode={"numeric"} minLength={"11"}
                        defaultValue={editUser.cpf}></input>
                        </section>
                        <section>
                        <label htmlFor={"telefone"}>Telefone</label>
                        <input name={"telefone"} type={"text"} defaultValue={editUser.telefone}></input>
                        </section>
                        </section>
                        
                        <section className={styles["form-section"]}>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"} defaultValue={editUser.email}/>
                        </section>

                        <input type={"submit"} value={"Atualizar"}></input>                
                    </form>

                    {
                    parseInt(uid) === editUser.id? 
                        <></> 
                        :
                        <div className={[styles["edit-div"]]} 
                        onClick={(e)=> handleDelete(e)}>
                            <AiOutlineUserDelete size={"2em"} />
                            <p>Deletar</p>
                        </div>
                    }
                </div>
        )
    }

    const Content = () => {
        if(cadMenu){
            return(
                <div>
                    <h3>Cadastro de usuário</h3>
                    <form className={styles['log-form']}
                    onSubmit={(e)=>handleSubmit(e)}>
                        <section className={styles["name-section"]}>
                        <p className="error-txt">{errorMsg}</p>
                        <label htmlFor={"nome"}>Nome</label>
                        <input name={"nome"} type={"text"}></input>
                        

                        <section className={styles["name-section"]}>
                            <label htmlFor={"cargo"}>Cargo</label>
                            <select name={"cargo"}>    
                                <option value={4}>Funcionário</option>
                                <option value={3}>Coordenador</option>
                                <option value={2}>Dirigente</option>
                                <option value={1}>Superintendente</option>
                            </select>
                        </section>

                        </section>

                        <section className={styles["name-section"]}>
                        <section>
                        <label htmlFor={"cpf"}>Cpf</label>
                        <input name={"cpf"} type={"text"} inputMode={"numeric"} minLength={"11"}></input>
                        </section>
                        <section>
                        <label htmlFor={"telefone"}>Telefone</label>
                        <input name={"telefone"} type={"text"}></input>
                        </section>
                        </section>
                        
                        <section className={styles["form-section"]}>
                        <label htmlFor={"email"}>Email</label>
                        <input name={"email"} type={"email"}/>
                        </section>

                        <input type={"submit"} value={"Cadastrar"}></input>                
                    </form>
                </div>
            )
        }

        if(editUser) return <ShowEdit />;

        if(usuarios.length){
            return(
                <div className={styles["sub-wrapper"]}>
                    <div className={styles["sub-header"]}>
                    <CadDiv />
                    </div>
                <div className={styles["map-container"]}>
                    {
                        usuarios.map((usuario) => (
                            <div className={styles["map-card"]} key={usuario.id}>
                                <h4>{usuario.nome}</h4>
                                <h5>{getCargo(usuario.cargo)}</h5>
                                <h5>{`Email: ${usuario.email}`}</h5>
                                <h5>{`Telefone: ${usuario.telefone}`}</h5>
                                <h5>{`CPF: ${usuario.cpf}`}</h5>
                                <div className={[styles["edit-div"]]} 
                                onClick={()=> setEditUser(usuario)}>
                                    <FiEdit size={"2em"} />
                                    <p>Editar</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </div>
            )
        }
        else{
            return(<h3>Cadastre primeiro uma instituição.</h3>)
        }
    };

    const CadDiv = () => {
        if(!cadMenu){
            return(
                <div className={[styles["edit-div"]]} onClick={()=>setCadMenu(true)}>
                    <AiOutlineUserAdd size={"30px"}/>
                    <p>Adicionar usuário</p>
                </div>
            )
        }
    }

    return (<Content />);
};

export default Usuarios;