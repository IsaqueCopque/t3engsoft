import Sequelize from "sequelize";
import db from '../connection.js';

const Curso = db.define('Curso',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    instituicao:{
        type: Sequelize.INTEGER,
        allowNull: false
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
        type: Sequelize.STRING,
        allowNull: false
    },
    autorizacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    reconhecimento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    renovacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    obsevacao:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

export default Curso;