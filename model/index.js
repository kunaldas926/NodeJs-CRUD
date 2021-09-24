const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.user = require('./user');
db.userAuthSettings = require('./userAuthSettings');
db.userToken = require('./userToken');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy' 
});
db.user.hasMany(db.user, { foreignKey: 'addedBy' });
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy' 
});
db.user.hasMany(db.user, { foreignKey: 'updatedBy' });
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId' 
});
db.user.hasMany(db.userAuthSettings, { foreignKey: 'userId' });
db.userToken.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId' 
});
db.user.hasMany(db.userToken, { foreignKey: 'userId' });
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId' 
});
db.user.hasMany(db.userRole, { foreignKey: 'userId' });
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId' 
});
db.role.hasMany(db.routeRole, { foreignKey: 'roleId' });
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId' 
});
db.role.hasMany(db.userRole, { foreignKey: 'roleId' });
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId' 
});
db.projectRoute.hasMany(db.routeRole, { foreignKey: 'routeId' });

module.exports = db;