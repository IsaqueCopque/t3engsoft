import express from "express";

import { Instituicao, Colaborador } from '../Db/models.js';
import { validaToken, getToken, geraToken  } from "./Auth.js";
import { criarLog } from "./Log.js";

const router = express.Router();

router.post('/', validaToken(1), async (req,res) => {
    try{
        const inst = await Instituicao.create(req.body);
        const uid = getToken(req.cookies["token"]).uid;
        const superint = await Colaborador.findOne({where: {id: uid}});
        await superint.setInstituicao(inst.id);
        const newtoken =  geraToken({uid: superint.id, ulv: 1, uit: inst.id}); //token com uit novo
        res.cookie("token",newtoken);
        res.status(200).end();
    }catch(error){res.status(500).json({error})}
});
router.get('/', validaToken(1), async (req,res) => {
    try{
        const uit = getToken(req.cookies["token"]).uit;
        const inst = await Instituicao.findOne({where: {id: uit}});
        res.send(200).json(inst);
    }catch(error){res.status(500).json({error: error})}
});
router.put('/', validaToken(1), async (req,res) => {
    try{
        const token = getToken(req.cookies["token"]);
        const inst = await Instituicao.findOne({where: {id: token.uit}});
        if(inst){
            await inst.update(req.body);
            await criarLog(`Alterou dados da instituição.`,token);
            res.status(200).end();
        }else  res.status(400).json({error: "Você não possui nenhuma instituição."})
    }catch(error){res.status(500).json({error: error})}
});

//Rotas para desenvolvimento
router.get('/', async(req,res)=> {
    const insts = await Instituicao.findAll();
    res.json(insts);
});
router.get('/:id', async(req,res)=> {
    const inst = await Instituicao.findAll({where: {id:req.params.id}});
    res.json(inst);    
});
router.delete('/:id', async(req,res) => {
    try{
        const inst = await Instituicao.findOne({where: {id:req.params.id}});
        if(inst)
            await inst.destroy();
        else
            throw "Não existe uma instituição com id "+req.params.id+".";
        res.status(200).send("Instituição deletada com sucesso.");
    }catch(e){
        res.status(500).send("Erro ao deletar instituicão. "+e)
    }
});
//-------------------------

export {router as Inst};