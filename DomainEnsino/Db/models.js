import Instituicao from "./Models/Instituicao.js";
import Colaborador from "./Models/Colaborador.js";
import Log from './Models/Log.js';
import Validador from "./Models/Validador.js";

//Relações

//Instituicao 1:N Colaborador
Instituicao.hasMany(Colaborador);
Colaborador.belongsTo(Instituicao);
//Colaborador 1:N Log
Colaborador.hasMany(Log);
Log.belongsTo(Colaborador);
//Validador 1:1 Instituição
Validador.belongsTo(Instituicao)
//---------

await Instituicao.sync();
await Colaborador.sync();
await Log.sync();
await Validador.sync();

export { Instituicao, Colaborador, Log, Validador};