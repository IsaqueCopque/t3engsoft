//Serviço de Instituição Ensino//

//Conexão com o banco
import db from './Db/connection.js';
try{
    await db.authenticate();
    console.log("Conexão com banco de ensino estabelecida.")
}catch(e){
    console.log("Erro ao conectar com banco de ensino." + e);
}

//API
import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Rotas
import { Inst } from './Routes/Inst.js';
import { Users } from './Routes/Users.js';
import { Log } from './Routes/Log.js';
import { Login } from './Routes/Login.js';
import { Validador } from './Routes/Validador.js';
import { Cursos } from './Routes/Cursos.js';
app.use('/inst', Inst);
app.use('/user', Users);
app.use('/validador', Validador);
app.use('/logs', Log);
app.use('/cursos', Cursos);
app.use('/login', Login);
//---

app.listen("8082", ()=>console.log("Instituição de ensino rodando na porta 8082."));