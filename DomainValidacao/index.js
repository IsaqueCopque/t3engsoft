//Serviço de Instituição Validadora//
//Conexão com o banco
import db from './Db/connection.js';
try{
    await db.authenticate();
    console.log("Conexão com banco de validação estabelecida.")
}catch(e){
    console.log("Erro ao conectar com banco de validação." + e);
}

//API
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
import { Inst } from './Routes/Inst.js';
import { Login } from './Routes/Login.js';
import { User } from './Routes/Users.js';
import { Parceira } from './Routes/Parceira.js';
import { Logs } from './Routes/Log.js';
import { Access } from './Routes/Access.js';
app.use('/inst', Inst);
app.use('/login', Login);
app.use('/user', User);
app.use('/parceiros', Parceira);
app.use('/logs', Logs);
app.use('/', Access);
//---

app.listen(process.env.VALIDAPORT, ()=>console.log("Instituição validadora rodando na porta "+process.env.VALIDAPORT+"."));