import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const verificaSenha = (senha, hash) => bcrypt.compareSync(senha, hash);
const hashSenha = (senha) => bcrypt.hashSync(senha,10);

const geraToken = (payload) => {
    const token = jwt.sign(payload,process.env.TOKENSECRET);
    return token;
};

const validaToken = (level) => {
    return (req,res, next) => {
        console.log(req.headers)
        const token = req.cookies["token"];
        if(!token) return res.status(400).json({error: "Usuário não autenticado."})
        const verifToken = jwt.verify(token, process.env.TOKENSECRET);
        if(verifToken){
            if(level === 0) next(); //para troca de senha
            else if(level === verifToken.ulv) next();
            else return res.status(400).json({error: "Usuário não tem acesso a esta funcionalidade."})
        }
        else return res.status(400).json({error: "Token de acesso inválido"});
    }
};

const getToken = (token) => {
    const verifToken = jwt.verify(token, process.env.TOKENSECRET);
    return {uid: verifToken.uid, uit: verifToken.uit, ulv: verifToken.ulv}
}

export {geraToken, validaToken, verificaSenha, hashSenha, getToken};