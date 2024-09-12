import { DataTypes, Sequelize } from 'sequelize';
import { user, password, host, database } from '../env.js';
import users from './userModal.js';

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 999,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Check Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('DB connection successful 🎉');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users(sequelize, DataTypes);

export default db;
