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
        type: Sequelize.STRING,
        allowNull: false
    },
    aluno:{
        type: Sequelize.JSON,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    }
})

export default Validacao;