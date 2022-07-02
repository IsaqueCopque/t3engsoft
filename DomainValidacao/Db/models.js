import Instituicao from "./Models/Instituicao.js";
import Colaborador from "./Models/Colaborador.js";
import Log from './Models/Log.js';
import Parceira from "./Models/Parceira.js";

//Relações

//Instituicao 1:N Colaborador
Instituicao.hasMany(Colaborador);
Colaborador.belongsTo(Instituicao);
//Colaborador 1:N Log
Colaborador.hasMany(Log);
Log.belongsTo(Colaborador);
//Instituicao 1:N Parceira
Instituicao.hasMany(Parceira);
Parceira.belongsTo(Instituicao);
//---------

await Instituicao.sync();
await Colaborador.sync();
await Log.sync();
await Parceira.sync();

export { Instituicao, Colaborador, Log, Parceira};