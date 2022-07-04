import express from "express";
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from './Log.js';
import Curso from "../Db/Models/Curso.js";
import Validacao  from "../Db/Models/Validacao.js";
import { Instituicao, Validador } from "../Db/models.js";

const router = express.Router();

//------Cursos------

router.post('/cursos', validaToken(3),async(req,res) => { //cadastro de curso
    try{
        const token = getToken(req.cookies["token"]);
        const data = {...req.body, "instituicao": token.uit};
        await Curso.post(data)
        await criarLog(`Cadastrou o Curso ${req.body.nome} de código ${req.body.emec}.`,token);
        res.status(200).json({"success": "Curso cadastrado."});  
    }catch(e){res.status(500).json({error: e})}
});

router.get('/cursos', validaToken(3),async(req,res) => {//obtém cursos
    try{
        const token = getToken(req.cookies["token"]);
        const cursos = await Curso.get(token.uit);
        res.status(200).json(cursos);
    }catch(e){console.log();res.status(500).json({error: e})}
});

router.put('/cursos/:id', validaToken(3), async(req,res) => {//atualiza curso
    try{
        const token = getToken(req.cookies["token"]);
        await Curso.put(req.body, req.params.id);
        await criarLog(`Atualizou o Curso de id ${req.params.id}.`,token);
        res.status(200).json({"success": "Curso atualizado."});  
    }catch(e){res.status(500).json({error: e})}
});

router.delete('/cursos/:id', validaToken(3), async(req,res) => {//deleta o curso
    try{
        await Curso.delete(req.params.id);
        res.status(200).json({"success": "Curso deletado."});
    }catch(e){res.status(500).json({error: e})}
});

//------------------

//----Validações----

router.post('/validacoes', validaToken(3) ,async (req,res)=>{ //faz solicitação de validação de diploma
    try{
        const token = getToken(req.cookies["token"]);
        const validador = await Validador.findOne({where: {instituicaoId: token.uit}});
        const inst = await Instituicao.findOne({where: {id: token.uit}});
        if(validador){
            const data = 
            {...req.body,
                "instvalida": validador.mec, 
                "instensino": inst.mec,
                "solicitante": token.uid,
                "status": "pendente"
            };
            await Validacao.post(data);
            res.status(200).json({"success":" Solicitação feita com sucesso."})
        }else{ res.status(400).json({"erro": "Não há instituição validadora cadastrada."})}
    }catch(e){console.log(e);res.status(500).json({erro: e})};
});

router.get('/validacoes', validaToken(3) ,async (req,res) => { //busca solicitações de validação
    try{
        const token = getToken(req.cookies["token"]);
        const inst = await Instituicao.findOne({where: {id:token.uit}});
        const solicitacoes = await Validacao.get(inst.mec, req.query.status);
        res.status(200).json(solicitacoes);
    }catch(e){res.status(500).json({erro: e})};
});

//------------------

export {router as Access};