const express = require('express');
const router = express.Router();
const userController = require('../../controller/device/userController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/device/api/v1/user/create').post(auth(...[ 'createByAdminInDevicePlatform', 'createByUserInDevicePlatform' ]),checkRolePermission,userController.addUser);
router.route('/device/api/v1/user/list').post(auth(...[ 'getAllByAdminInDevicePlatform', 'getAllByUserInDevicePlatform' ]),checkRolePermission,userController.findAllUser);
router.route('/device/api/v1/user/:id').get(auth(...[ 'getByAdminInDevicePlatform', 'getByUserInDevicePlatform' ]),checkRolePermission,userController.getUser);
router.route('/device/api/v1/user/count').post(auth(...[ 'getCountByAdminInDevicePlatform', 'getCountByUserInDevicePlatform' ]),checkRolePermission,userController.getUserCount);
router.route('/device/api/v1/user/update/:id').put(auth(...[ 'updateByAdminInDevicePlatform', 'updateByUserInDevicePlatform' ]),checkRolePermission,userController.updateUser);    
router.route('/device/api/v1/user/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInDevicePlatform',
  'partialUpdateByUserInDevicePlatform'
]),checkRolePermission,userController.partialUpdateUser);
router.route('/device/api/v1/user/softDelete/:id').put(auth(...[
  'softDeleteByAdminInDevicePlatform',
  'softDeleteByUserInDevicePlatform'
]),checkRolePermission,userController.softDeleteUser);
router.route('/device/api/v1/user/softDeleteMany').put(auth(...[
  'softDeleteManyByAdminInDevicePlatform',
  'softDeleteManyByUserInDevicePlatform'
]),checkRolePermission,userController.softDeleteManyUser);
router.route('/device/api/v1/user/addBulk').post(auth(...[ 'addBulkByAdminInDevicePlatform', 'addBulkByUserInDevicePlatform' ]),checkRolePermission,userController.bulkInsertUser);
router.route('/device/api/v1/user/updateBulk').put(auth(...[
  'updateBulkByAdminInDevicePlatform',
  'updateBulkByUserInDevicePlatform'
]),checkRolePermission,userController.bulkUpdateUser);
router.route('/device/api/v1/user/change-password').put(auth(...[
  'changePasswordByAdminInDevicePlatform',
  'changePasswordByUserInDevicePlatform'
]),userController.changePassword);
router.route('/device/api/v1/user/update-profile').put(auth(...[
  'updateProfileByAdminInDevicePlatform',
  'updateProfileByUserInDevicePlatform'
]),userController.updateProfile);

module.exports = router;
