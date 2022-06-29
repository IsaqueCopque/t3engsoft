import Sequelize from "sequelize";
import db from '../connection.js';

const Curso = db.define('Curso',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    grau:{
        type: Sequelize.STRING,
        allowNull: false
    },
    emec:{
        type: Sequelize.DATE,
        allowNull: false
    },
    autorizacao:{
        type: Sequelize.JSON,
        allowNull: false
    },
    reconhecimento:{
        type: Sequelize.JSON,
        allowNull: false
    },
    renovacao:{
        type: Sequelize.JSON,
        allowNull: false
    },
})

export default Curso;