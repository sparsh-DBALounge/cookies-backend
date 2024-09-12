import db from './models/index.js';

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('DB has been synchronized');
  })
  .catch((err) => {
    console.log('Error syncing DB', err);
  });
