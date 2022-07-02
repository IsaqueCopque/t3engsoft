import Curso from "./Models/Curso.js";
import Validacao from "./Models/Validacao.js";

await Curso.sync();
await Validacao.sync();

export { Curso, Validacao};