import express from "express";
import { Colaborador } from '../Db/models.js';
import { hashSenha, validaToken, getToken } from "./Auth.js";
import { criarLog } from './Log.js';


const router = express.Router();

router.get('/', validaToken(1),async(req,res) => {
    try{
        const token = getToken(req.cookies["token"]);
        if(token.uit){
            const colaboradores = await Colaborador.findAll({where: {instituicaoId: token.uit}});
            res.status(200).json(colaboradores);
        }else{res.status(200).json([])};
    }catch(error){res.status(500).json({error})}
});

router.put('/:id', validaToken(1), async(req,res) => {
    try{
        const colaborador = await Colaborador.findOne({where: {id: req.params.id}});
        if(colaborador){
            const colabData = {...req.body, "senha":colaborador.senha}
            await colaborador.update(colabData);
            await criarLog(`Alterou dados do colaborador ${colaborador.nome} de id ${colaborador.id}.`,getToken(req.cookies["token"]));
            res.status(200).end();
        }
        else
            res.status(400).json({error: "Id de colaborador inválido"});
    }catch(error){ res.status(500).json({error})}
});

router.delete('/:id', validaToken(1), async(req,res) => {
    try{
        const colaborador = await Colaborador.findOne({where: {id: req.params.id}});
        if(colaborador){
            await criarLog(`Deletou colaborador ${colaborador.nome} de id ${colaborador.id}.`,getToken(req.cookies["token"]));
            await colaborador.destroy();
            res.status(200).end();
        }
        else
            res.status(400).json({error: "Id de colaborador inválido"});
    }catch(e){ res.status(500).json({error: e})}
});

router.post('/', validaToken(1), async(req,res) => {
    try{
        var colaborador = await Colaborador.findOne({where: {email: req.body.email}});
        if(colaborador)
            res.status(400).json({error: "Já existe um colaborador cadastrado neste email."})
        else{
            const hash = hashSenha("default123");
            const colabData = {...req.body, "senha": hash};
            colaborador = await Colaborador.create(colabData);
            const token = getToken(req.cookies["token"]);
            await colaborador.setInstituicao(token.uit);
            await criarLog(`Cadastrou o colaborador ${colaborador.nome} de id ${colaborador.id}.`,token);
        }
        res.status(200).end();
    }catch(error){res.status(500).json({error})}
});

export {router as User};