import { Log } from "../Db/models.js";
import sequelize from "sequelize";

const criarLog = async(acao, inst) => {
    const log = await Log.create({
        acao,
        data: sequelize.fn('NOW')
    }); 
    await log.setColaborador(inst);
};

export { criarLog };