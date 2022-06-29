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
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
import { Inst } from './Routes/Inst.js';
import { Login } from './Routes/Login.js';
app.use('/inst', Inst);
app.use('/login', Login);
//---

app.listen(process.env.VALIDAPORT, ()=>console.log("Instituição validadora rodando na porta "+process.env.VALIDAPORT+"."));