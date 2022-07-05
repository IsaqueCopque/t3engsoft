import { Validacao } from "./Db/models.js";
import fs from "fs";

const backup = async () => {
    try{
        var validacoes = await Validacao.findAll();
        var backupContent = JSON.stringify(validacoes);
        fs.writeFile("ARQBACKUP.json",backupContent,'utf-8',(err)=>{console.log(err);})
        console.log(" \n-------------------\nBACKUP realizado com sucesso.\n-------------------\n");

    }catch(e){
        console.log(e);
    };
}

export default backup;