import express from "express";
import { Curso } from '../Db/models.js';
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from './Log.js';

const router = express.Router();

router.get('/', validaToken(3),async(req,res) => {
    try{
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);
    }catch(error){res.status(500).json({error})}
});
router.put('/:id', validaToken(3), async(req,res) => {
    try{
        const curso = await Curso.findOne({where: {id: req.params.id}});
        if(curso){
            await curso.update(req.body);
            await criarLog(`Alterou dados do Curso ${curso.nome} de id ${curso.id}.`,getToken(req.cookies["token"]).uit);
            res.status(200).end();
        }
        else
            res.status(400).json({error: "Id de curso inválido"});
    }catch(error){ res.status(500).json({error})}
});
router.delete('/:id', validaToken(3), async(req,res) => {
    try{
        const curso = await Curso.findOne({where: {id: req.params.id}});
        if(curso){
            await criarLog(`Deletou Curso ${curso.nome} de id ${curso.id}.`,getToken(req.cookies["token"]).uit);
            await curso.destroy();
            res.status(200).end();
        }
        else
            res.status(400).json({error: "Id de curso inválido"});
    }catch(error){ res.status(500).json({error})}
});
router.post('/', validaToken(3), async(req,res) => {
    try{
        var curso = await Curso.findOne({where: {email: req.body.email}});
        if(curso)
            res.status(400).json({error: "Já existe um curso cadastrado neste email."})
        else{
            const curso = await Curso.create(req.body);
            const inst = getToken(req.cookies["token"]).uit;
            await curso.setInstituicao(inst);
            await criarLog(`Cadastrou o Curso ${curso.nome} de id ${curso.id}.`,getToken(req.cookies["token"]).uit);
        }
        res.status(200).end();
    }catch(error){res.status(500).json({error})}
});

export {router as User};