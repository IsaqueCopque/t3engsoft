import express from "express";
import { Validacao } from '../Db/models.js';
import { validaToken, getToken } from "./Auth.js";

const router = express.Router();

router.post('/', validaToken(4), async(req,res) => {
    try{
        const valid = await Validacao.create(req.body);
        const funci = getToken(req.cookies["token"]).uid;
        await valida.setColaborador(funci);
        await criarLog(`Validou o diploma do aluno: ${valid.nome} do curso ${valid.curso}.`,getToken(req.cookies["token"]).uit);
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