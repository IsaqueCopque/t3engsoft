import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPASSWORD,{
    host: process.env.DBHOST,
    dialect: 'mysql',
    port: process.env.DBPORT
})

export default sequelize;