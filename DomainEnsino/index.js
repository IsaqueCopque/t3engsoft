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
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
import { Inst } from './Routes/Inst.js';
app.use('/inst', Inst);
//---

app.listen("8082", ()=>console.log("Instituição de ensino rodando na porta 8082."));