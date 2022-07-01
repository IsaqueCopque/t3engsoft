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
        type: Sequelize.STRING,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    },
    validado:{
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
    },
    validador:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Validacao;