import express from "express";
import 'cookie-parser';

import { Colaborador } from "../Db/models.js";
import { verificaSenha, hashSenha, geraToken } from "./Auth.js";

const router = express.Router();

router.post('/register', async (req,res) => {
    try{
        const hash = hashSenha(req.body.senha);
        req.body.senha = hash;
        await Colaborador.create({...req.body,"cargo":1});
        res.status(200).json({"sucess": "Diretor criado."});
    }catch(e){res.status(500).send("Erro ao cadastrar colaborador. "+e);}
})

router.post('/', async (req,res) => {
   const {email, senha} = req.body;
   const colaborador = await Colaborador.findOne({where: {email: email}});
   if(colaborador){
        if(verificaSenha(senha,colaborador.senha)){
            const token = geraToken({uid: colaborador.id, ulv: colaborador.cargo, uit: colaborador.instituicaoId});
            res.cookie("token", token); 
            res.status(200).json({"token":token, cargo:colaborador.cargo, uid:colaborador.id});
        }
        else{ res.status(400).send("Credências de login incorretas."); }
    }else{res.status(400).send("Não há registros para o email informado.")}
});

router.post('/change', async (req,res) => {
    try{
        const {email, senha} = req.body;
        const colaborador = await Colaborador.findOne({where: {email: email}});
        if(colaborador){
            const hash = hashSenha(senha);
            await colaborador.update({"senha": hash});
            res.status(200).json({"sucess": "Senha atualizada"});
        }else{ res.status(400).json({error: "Este email não está cadastrado."}); }
    }catch(e){res.status(500).json({error: e})};
});

router.post('/logout', (req,res) => {
    res.clearCookie("token");
    res.status(200).end();
})

export { router as Login };