import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'cookie-parser';

import { Colaborador } from "../Db/models.js";

const validaToken = (req,res, next) => {
    try{
        const token = req.cookies["token"];
        if(!token) return res.status(400).json({error: "Usuário não autenticado."})
        const verifToken = jwt.verify(token, process.env.TOKENSECRET);
        if(verifToken)
            req.userId = verifToken.userId;
            return next();
    }catch(error){
        return res.status(400).json({error})
    };
}

const cadastra = async (colabData,instId) => {
    try{
        bcrypt.hash(colabData.senha, 10, async (err,hash) => {
            if(err) throw "erro hash de senha";
            colabData.senha = hash;
            const colab = await Colaborador.create(colabData);
            await colab.setInstituicao(instId);
        });        
    }catch(e){console.log("Erro ao cadastrar colaborador. "+e);}
};

const router = express.Router();

router.post('/', async (req,res) => {
   const {email, senha} = req.body;
   const colaborador = await Colaborador.findOne({where: {email: email}});
   if(colaborador){
    bcrypt.compare(senha, colaborador.senha, (err,result)=>{
        if(!err){
            if(result){
                const token = jwt.sign({uid: colaborador.id, ulv: colaborador.cargo},process.env.TOKENSECRET);
                res.cookie("token", token);   
                res.status(200).json(token);
            }
            else
                res.status(400).send("Credências de login incorretas.");
        }
        else res.status(500).send(err);
    })
   }
   else{res.status(400).send("Não há registros para o email informado.")}
});

export { router as Login, cadastra};