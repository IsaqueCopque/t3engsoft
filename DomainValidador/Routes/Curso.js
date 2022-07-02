import express from 'express';
import Sequelize from 'sequelize';
import { Curso } from '../Db/models.js';

const router = express.Router();

router.get('/:id',async(req,res) => {//devolve todos os cursos da instituicao
    try{
        const cursos = await Curso.findAll({where: {instituicao: req.params.id}});
        res.status(200).json(cursos);
    }catch(error){res.status(500).json({error})}
});

router.get('/emec/:emec',async(req,res) => {//devolve o curso da instituição para código emec
    try{
        const curso = await Curso.findOne({where: {emec: req.params.emec}});
        res.status(200).json(curso);
    }catch(error){res.status(500).json({error})}
});

router.put('/:id', async(req,res) => {
    try{
        const curso = await Curso.findOne({where: {id: req.params.id}});
        if(curso){
            await curso.update(req.body);
            res.status(200).end();
        }
        else
            res.status(400).json({error: "Id de curso inválido"});
    }catch(error){ res.status(500).json({error})}
});

router.delete('/:id', async(req,res) => {
    try{
        const curso = await Curso.findOne({where: {id: req.params.id}});
        if(curso){
            await curso.destroy();
            res.status(200).end();
        }
        else
            res.status(400).json({error: "Id de curso inválido"});
    }catch(error){ res.status(500).json({error})}
});

router.post('/', async(req,res) => {
    try{
        var curso = await Curso.findOne({where: {emec: req.body.emec}});
        if(curso)
            res.status(400).json({error: "Já existe um curso com este código."});
        else{
            await Curso.create(req.body);
            res.status(200).end();
        }
    }catch(e){res.status(500).json({error: e})}
});

export { router as Cursos}