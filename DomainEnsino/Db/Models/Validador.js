import Sequelize from "sequelize";
import db from '../connection.js';

const Validador = db.define('validador',{
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
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mec:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mantenedora:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default Validador;