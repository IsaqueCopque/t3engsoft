import { Log } from "../Db/models.js";
import sequelize from "sequelize";
import express from 'express';
import { validaToken } from "./Auth.js";

const criarLog = async(acao, inst) => {
    const log = await Log.create({
        acao,
        data: sequelize.fn('NOW')
    }); 
    await log.setColaborador(inst);
};

const router = express.Router();

router.get('/', validaToken(3), async(req,res) => {
    try{
        const logs = await Log.findAll();
        res.status(200).json(logs);
    }catch(e){res.status(500).json({error: e})}
});
router.get('/:id', validaToken(3), async(req,res) => {
    try{
        const log = await Log.findOne({where: {id: req.params.id}});
        res.status(200).json(log);
    }catch(e){res.status(500).json({error: e})}
});

export { criarLog, router as Logs };