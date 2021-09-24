const express = require('express');
const router = express.Router();
const userController = require('../../controller/client/userController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/client/api/v1/user/create').post(auth(...[ 'createByAdminInClientPlatform', 'createByUserInClientPlatform' ]),checkRolePermission,userController.addUser);
router.route('/client/api/v1/user/list').post(auth(...[ 'getAllByAdminInClientPlatform', 'getAllByUserInClientPlatform' ]),checkRolePermission,userController.findAllUser);
router.route('/client/api/v1/user/:id').get(auth(...[ 'getByAdminInClientPlatform', 'getByUserInClientPlatform' ]),checkRolePermission,userController.getUser);
router.route('/client/api/v1/user/count').post(auth(...[ 'getCountByAdminInClientPlatform', 'getCountByUserInClientPlatform' ]),checkRolePermission,userController.getUserCount);
router.route('/client/api/v1/user/update/:id').put(auth(...[ 'updateByAdminInClientPlatform', 'updateByUserInClientPlatform' ]),checkRolePermission,userController.updateUser);    
router.route('/client/api/v1/user/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInClientPlatform',
  'partialUpdateByUserInClientPlatform'
]),checkRolePermission,userController.partialUpdateUser);
router.route('/client/api/v1/user/softDelete/:id').put(auth(...[
  'softDeleteByAdminInClientPlatform',
  'softDeleteByUserInClientPlatform'
]),checkRolePermission,userController.softDeleteUser);
router.route('/client/api/v1/user/softDeleteMany').put(auth(...[
  'softDeleteManyByAdminInClientPlatform',
  'softDeleteManyByUserInClientPlatform'
]),checkRolePermission,userController.softDeleteManyUser);
router.route('/client/api/v1/user/addBulk').post(auth(...[ 'addBulkByAdminInClientPlatform', 'addBulkByUserInClientPlatform' ]),checkRolePermission,userController.bulkInsertUser);
router.route('/client/api/v1/user/updateBulk').put(auth(...[
  'updateBulkByAdminInClientPlatform',
  'updateBulkByUserInClientPlatform'
]),checkRolePermission,userController.bulkUpdateUser);
router.route('/client/api/v1/user/change-password').put(auth(...[
  'changePasswordByAdminInClientPlatform',
  'changePasswordByUserInClientPlatform'
]),userController.changePassword);
router.route('/client/api/v1/user/update-profile').put(auth(...[
  'updateProfileByAdminInClientPlatform',
  'updateProfileByUserInClientPlatform'
]),userController.updateProfile);

module.exports = router;
