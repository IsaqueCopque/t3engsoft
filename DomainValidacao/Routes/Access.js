import express from "express";
import { validaToken, getToken } from "./Auth.js";
import { criarLog } from "./Log.js";
import getCurso  from "../Db/Models/Curso.js";
import Validacao  from "../Db/Models/Validacao.js";
import { Instituicao } from "../Db/models.js";
import { Parceira } from "../Db/models.js";

const router = express.Router();

//----Validação----
router.get('/validacoes/', validaToken(4), async(req,res) => { //busca validações pendentes
    try{
        const token = getToken(req.cookies["token"]);
        const instituicao = await Instituicao.findOne({where: {id: token.uit}});
        const validacoes = await Validacao.get(instituicao.mec, "pendente");
        let parceira, autorizadas = [];
        for(let valid of validacoes){ //filtra por acesso
            parceira = await Parceira.findOne({where: {mec: valid.instensino}});
            if(parceira && parceira.acesso){
                autorizadas.push(valid);
            }
        }
        res.status(200).json(autorizadas);
    }catch(e){res.status(500).json({error:e})}
});

router.put('/validacoes/:id', validaToken(4), async (req,res) => {//valida diploma
    try{
        const token = getToken(req.cookies["token"]);
        const data = {...req.body, "validador":token.uid};
        await Validacao.put(data,req.params.id);
        criarLog(`Validou solicitação de id ${req.params.id}`,token);
        res.status(200).json({"success":"Diploma validado."});
    }catch(e){res.status(500).json({error:e})}
})

//-----------------

//------Curso-----
router.get('/curso/:emec', validaToken(4), async(req,res) => {//busca informação do curso para validar
    try{
        const curso = await getCurso(req.params.emec);
        res.status(200).json(curso);
    }catch(e){res.status(500).json({error:e})}
})
//-----------------

export {router as Access};