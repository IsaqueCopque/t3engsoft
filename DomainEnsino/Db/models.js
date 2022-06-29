import Instituicao from "./Models/Instituicao.js";
import Colaborador from "./Models/Colaborador.js";
import Log from './Models/Log.js';
import  from "./Models/Curso.js";

//Relações

//Instituicao 1:N Colaborador
Instituicao.hasMany(Colaborador);
Colaborador.belongsTo(Instituicao);
// //Instituicao 1:N Curso
Instituicao.hasMany(Curso);
Curso.belongsTo(Instituicao);
// //Colaborador 1:N Log
Colaborador.hasMany(Log);
Log.belongsTo(Colaborador);

//---------

Instituicao.sync();
Colaborador.sync();
Curso.sync();
Log.sync();

// Instituicao.sync({force: true});
// Colaborador.sync({force: true});
// Curso.sync({force: true});
// Log.sync({force: true});

export { Instituicao, Colaborador, Log, Curso};