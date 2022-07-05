//Domínio de validador//
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
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:8081",
        "http://localhost:8082",
    ]
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rotas
import { Cursos } from './Routes/Curso.js';
import { Validacoes } from './Routes/Validacao.js';

app.use('/cursos', Cursos);
app.use('/validacoes', Validacoes);
//---

//backup
import backup from './backup.js';
var tempo = 60000 * 3; //três minutos
const timer = () => {
    setTimeout(
        function(){backup(); timer();},
        tempo
    )
}
timer();

app.listen(process.env.VALIDADORPORT, ()=>console.log("Validador rodando na porta "+process.env.VALIDADORPORT+"."));