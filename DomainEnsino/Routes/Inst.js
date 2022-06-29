import express from "express";

import { Instituicao, Validacao, Colaborador } from '../Db/models.js';
const router = express.Router();

//Rotas
//----------------------------

//Rotas de desenvolvimento
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
        await Instituicao.create(req.body)
        res.status(200).send("Instituição criada com sucesso");
    }catch(e){
        res.status(500).send("Erro ao criar insituição. "+e);
    }
});
router.put('/', async(req,res) => {

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