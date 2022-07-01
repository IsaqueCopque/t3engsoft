import express from "express";
import { Validacao } from '../Db/models.js';
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from "./Log.js";

const router = express.Router();

router.post('/', validaToken(4), async(req,res) => {
    try{
        const token = getToken(req.cookies["token"]);
        const valid = await Validacao.create({...req.body, "validador":token.uid});
        await valid.setInstituicao(token.uit);
        await criarLog(`Validou o diploma do aluno: ${valid.aluno} do curso ${valid.curso}.`,token);
        res.status(200).json({success: "Diploma validado"});
    }catch(e){res.status(500).json({error:e})}
});

router.get('/', validaToken(4), async(req,res) => {//busca validações pendentes
    try{
        const validas = await Validacao.findAll({where: {validado: false}});
        res.status(200).json(validas);
    }catch(e){res.status(500).json({error:e})}
});

export {router as Valida};