import Instituicao from "./Models/Instituicao.js";
import Colaborador from "./Models/Colaborador.js";
import Log from './Models/Log.js';
import Curso from "./Models/Curso.js";
import Validador from "./Models/Validador.js";

//Relações

//Instituicao 1:N Colaborador
Instituicao.hasMany(Colaborador);
Colaborador.belongsTo(Instituicao);
//Instituicao 1:N Curso
Instituicao.hasMany(Curso);
Curso.belongsTo(Instituicao);
//Colaborador 1:N Log
Colaborador.hasMany(Log);
Log.belongsTo(Colaborador);
//Validador 1:1 Instituição
Validador.belongsTo(Instituicao)
//---------

Instituicao.sync();
Colaborador.sync();
Curso.sync();
Log.sync();
Validador.sync();

// Instituicao.sync({force: true});
// Colaborador.sync({force: true});
// Curso.sync({force: true});
// Log.sync({force: true});

export { Instituicao, Colaborador, Log, Curso};