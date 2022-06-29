import express from "express";

import { Instituicao, Validacao, Colaborador } from '../Db/models.js';
import { cadastra } from "./Login.js";

const router = express.Router();

//Rotas restritas para desenvolvimento
router.get('/', async(req,res)=> {
    const insts = await Instituicao.findAll();
    res.json(insts);
});
router.get('/:id', async(req,res)=> {
    const inst = await Instituicao.findAll({where: {id:req.params.id}});
    res.json(inst);    
});
router.post('/', async (req,res) => {
    try{
        const inst = await Instituicao.create(req.body.insti);
        cadastra(req.body.superint, inst.id); //cadastra colaborador
        res.status(200).send("Instituição criada com sucesso");
    }catch(e){
        res.status(500).send("Erro ao criar insituição. "+e);
    }
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
//----------------------------
export {router as Inst};