import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gst', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' 
});

export default sequelize;