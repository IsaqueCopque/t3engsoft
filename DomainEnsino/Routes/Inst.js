import express from "express";

import { Instituicao, Colaborador } from '../Db/models.js';
import { criarLog } from "./Log.js";
import { getToken, geraToken, validaToken } from "./Auth.js";
const router = express.Router();

router.post('/', validaToken(1), async (req,res) => {
    try{
        const inst = await Instituicao.create(req.body);
        var token = getToken(req.cookies["token"]);
        const diretor = await Colaborador.findOne({where: {id: token.uid}});
        await diretor.setInstituicao(inst.id);
        token = geraToken({uid: diretor.id, uit: inst.id, ulv: 1});
        res.cookie("token",token);
        res.status(200).end();
    }catch(e){res.status(500).json({error: e})}
});
router.get('/', validaToken(1), async (req,res) => {
    try{
        const uit = getToken(req.cookies["token"]).uit;
        const inst = await Instituicao.findOne({where: {id: uit}});
        if(inst) res.status(200).json(inst);
        else res.status(400).json({error: "Você não possui nenhuma instituição."})        
    }catch(error){res.status(500).json({error: error})}
});
router.put('/', validaToken(1), async (req,res) => {
    try{
        const uit = getToken(req.cookies["token"]).uit;
        const inst = await Instituicao.findOne({where: {id: uit}});
        if(inst){
            await inst.update(req.body);
            await criarLog(`Alterou dados da instituição.`,getToken(req.cookies["token"]));
            res.status(200).end();
        }else res.status(400).json({error: "Você não possui nenhuma instituição."})
    }catch(error){res.status(500).json({ee: error})}
});

export {router as Inst};