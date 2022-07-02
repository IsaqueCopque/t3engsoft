import express from 'express';
import { Validacao } from '../Db/models.js';
import Sequelize from 'sequelize';

const router = express.Router();

router.get('/byensino/:mec', async (req,res) => { //obter todas validações por instituição de ensino
    try{
        var validacoes;
        if('status' in req.query){ //status = pendente, validado, recusado
            validacoes = await Validacao.findAll(
                {where: { [Sequelize.Op.and]:
                    [
                        {instensino: req.params.mec},
                        {status: req.query.status}            
                    ] }
                }) 
        }
        else{ validacoes = await Validacao.findAll({where : {instensino:req.params.id}}); }
        res.status(200).json(validacoes);
    }catch(e){res.status(500).json({error:e})}
});
router.get('/byvalida/:mec', async (req,res) => { //obter todas validações por instituição de validação
    try{
        var validacoes;
        if('status' in req.query){ //status = pendente, validado, recusado
            validacoes = await Validacao.findAll(
                {where: { [Sequelize.Op.and]:
                    [
                        {instvalida: req.params.mec},
                        {status: req.query.status}            
                    ] }
                });
        }
        else{ validacoes = await Validacao.findAll({where : {instvalida:req.params.id}}); }
        res.status(200).json(validacoes);
    }catch(e){res.status(500).json({error:e})}
});

router.post('/', async (req,res) => {//solicitar validação
    try{
        await Validacao.create(req.body);
        res.status(200).json({"success": "Solicitação de validação gerada."});
    }catch(e){console.log(e);res.status(500).json({error:e})}
});
router.put('/validar/:id', async (req,res) => {//validar
    try{    
        const solicitacao = await Validacao.findOne({where: {id: req.params.id}});
        if(solicitacao){
            await solicitacao.update({status: req.body.status})
            res.status(200).json({"success": "Solicitação validada com sucesso."});
        }else{ res.status(400).json({"error": "Não há válidação com o id informado."}) }
    }catch(e){res.status(500).json({error:e})}
});

export { router as Validacoes};