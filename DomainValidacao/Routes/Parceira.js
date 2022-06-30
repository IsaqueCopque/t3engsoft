import express from "express";
import { Parceira } from '../Db/models.js';
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from "./Log.js";

const router = express.Router();

router.post('/', validaToken(2), async(req,res) => {
    try{
        const parc = await Parceira.create(req.body);
        const inst = getToken(req.cookies["token"]).uit;
        await parc.setInstituicao(inst);
        await criarLog(`Cadastrou uma instituição parceira: ${parc.nome} de id ${parc.id}.`,getToken(req.cookies["token"]).uit);
        res.status(200).json({success: "Instituição parceira criada"});
    }catch(e){res.status(500).json({error:e})}
});

router.post('/acesso/:id', validaToken(1), async(req,res) => {
    try{
        const parc = await Parceira.findOne({where: {id: req.params.id}});
        if(parc){
            await parc.update({"acesso":req.body.acesso});
            await criarLog(`Liberou acesso da instituição ${parc.nome} de id ${parc.id}.`,getToken(req.cookies["token"]).uit);
            res.status(200).json({success: "Acesso definido"});
        }
        else{res.status(400).json({error: "Não existe instituição parceira com o id informado."})}
    }catch(e){res.status(500).json({error:e})}
});

router.get('/acesso/', validaToken(1), async(req,res) => { //obtém as que tem acesso
    try{
        const parc = await Parceira.findAll({where: {acesso: true}});
        res.status(200).json(parc);
    }catch(e){res.status(500).json({error:e})}
});
router.get('/', validaToken(1), async(req,res) => { //obtém todas
    try{
        const parc = await Parceira.findAll();
        res.status(200).json(parc);
    }catch(e){res.status(500).json({error:e})}
});

export {router as Parceira};