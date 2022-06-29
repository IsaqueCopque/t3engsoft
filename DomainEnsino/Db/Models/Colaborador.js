import Sequelize from "sequelize";
import db from '../connection.js';

const Colaborador = db.define('colaborador',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cargo:{ //1 -dirigente, 2-diretor, 3- funcionario
        type: Sequelize.TINYINT,
        allowNull: false,
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING(11),
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Colaborador;