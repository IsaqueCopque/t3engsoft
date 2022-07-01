import express from "express";
import { Validador } from '../Db/models.js';
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from "./Log.js";

const router = express.Router();

router.post('/', validaToken(2), async(req,res) => {
    try{
        var validador = await Validador.findOne({where: {instituicaoId: getToken(req.cookies["token"]).uit}});
        if(validador){ res.status(400).json({"error": "Já existe um validador cadastrado."});
        }else{
        validador = await Validador.create(req.body);
        const token = getToken(req.cookies["token"]);
        await validador.setInstituicao(token.uit);
        await criarLog(`Cadastrou uma instituição validadora: ${validador.nome} de id ${validador.id}.`,token);
        res.status(200).json({success: "Instituição validadora cadastrada"});
        }
    }catch(e){res.status(500).json({error:e})}
});
router.get('/', validaToken(1), async(req,res) => {
    try{
        const validador = await Validador.findOne({where: {instituicaoId: getToken(req.cookies["token"]).uit}});
        res.status(200).json(validador);
    }catch(e){res.status(500).json({error:e})}
});
router.put('/', validaToken(1), async(req,res) => {
    try{
        const validador = await Validador.findOne({where: {instituicaoId: getToken(req.cookies["token"]).uit}});
        if(validador){
            validador.update(req.body);
            await criarLog(`Atualizou instituição validadora: ${validador.nome} de id ${validador.id}.`,token);
            res.status(200).json({"success":"Validador atualizado"});
        }
        else res.status(400).json({error: "Não há instituição validadora cadastrada."})
    }catch(e){res.status(500).json({error:e})}
});

export {router as Validador};