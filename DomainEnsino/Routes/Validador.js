import express from "express";
import { Validador } from '../Db/models.js';
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from "./Log.js";

const router = express.Router();

router.post('/', validaToken(2), async(req,res) => {
    try{
        const validador = await Validador.create(req.body);
        const token = getToken(req.cookies["token"]);
        await validador.setInstituicao(inst.uit);
        await criarLog(`Cadastrou uma instituição validadora: ${parc.nome} de id ${parc.id}.`,token);
        res.status(200).json({success: "Instituição validadora cadastrada"});
    }catch(e){res.status(500).json({error:e})}
});
router.get('/', validaToken(1), async(req,res) => {
    try{
        const validador = await Validador.findOne({where: {id: getToken(req.cookies["token"]).uit}});
        res.status(200).json(validador);
    }catch(e){res.status(500).json({error:e})}
});
router.put('/', validaToken(1), async(req,res) => {
    try{
        const validador = await Validador.findOne({where: {id: getToken(req.cookies["token"]).uit}});
        if(validador) res.status(200).json(validador);
        else res.status(400).json({error: "Não há instituição validadora cadastrada."})
    }catch(e){res.status(500).json({error:e})}
});

export {router as Parceira};