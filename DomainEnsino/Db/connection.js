import Sequelize from 'sequelize';

const sequelize = new Sequelize('ensinodb','root','1234',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

export default sequelize;