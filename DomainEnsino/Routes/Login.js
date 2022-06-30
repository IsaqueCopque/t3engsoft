import express from "express";
import 'cookie-parser';

import { Colaborador } from "../Db/models.js";
import { verificaSenha, hashSenha, geraToken } from "./Auth.js";

const router = express.Router();

router.post('/register', async (req,res) => {
    try{
        const hash = hashSenha(req.body.senha);
        req.body.senha = hash;
        await Colaborador.create(req.body);
        res.status(200).json({"sucess": "Dirigente criado."});
    }catch(e){res.status(500).send("Erro ao cadastrar colaborador. "+e);}
})

router.post('/', async (req,res) => {
   const {email, senha} = req.body;
   const colaborador = await Colaborador.findOne({where: {email: email}});
   if(colaborador){
        if(verificaSenha(senha,colaborador.senha)){
            const token = geraToken({uid: colaborador.id, ulv: colaborador.cargo, uit: colaborador.instituicaoId});
            res.cookie("token", token); 
            res.status(200).json(token);
        }
        else{ res.status(400).send("Credências de login incorretas."); }
    }else{res.status(400).send("Não há registros para o email informado.")}
});

export { router as Login };