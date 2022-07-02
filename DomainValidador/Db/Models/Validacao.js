import Sequelize from "sequelize";
import db from '../connection.js';

const Validacao = db.define('Validacao',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    curso:{
        type: Sequelize.JSON,
        allowNull: false
    },
    aluno:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        default: "pendente"
    },
    instensino:{
        type: Sequelize.STRING,//mec
        allowNull: false
    },
    instvalida:{
        type: Sequelize.STRING, //mec
        allowNull: false
    },
    solicitante:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    validador:{
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

export default Validacao;