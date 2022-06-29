import Instituicao from "./Models/Instituicao.js";
import Colaborador from "./Models/Colaborador.js";
import Log from './Models/Log.js';
import Validacao from "./Models/Validacao.js";

//Relações

//Instituicao 1:N Colaborador
Instituicao.hasMany(Colaborador);
Colaborador.belongsTo(Instituicao);
// //Instituicao 1:N Validacao
Instituicao.hasMany(Validacao);
Validacao.belongsTo(Instituicao);
// //Colaborador 1:N Log
Colaborador.hasMany(Log);
Log.belongsTo(Colaborador);

//---------

Instituicao.sync();
Colaborador.sync();
Log.sync();
Validacao.sync();


// Instituicao.sync({force: true});
// Colaborador.sync({force: true});
// Validacao.sync({force: true});
// Log.sync({force: true});

export { Instituicao, Colaborador, Log, Validacao};