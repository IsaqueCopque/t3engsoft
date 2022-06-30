import Sequelize from "sequelize";
import db from '../connection.js';

const Log = db.define('Log',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    acao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    }
})

export default Log;