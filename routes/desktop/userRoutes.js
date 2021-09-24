const express = require('express');
const router = express.Router();
const userController = require('../../controller/desktop/userController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/desktop/api/v1/user/create').post(auth(...[ 'createByAdminInDesktopPlatform', 'createByUserInDesktopPlatform' ]),checkRolePermission,userController.addUser);
router.route('/desktop/api/v1/user/list').post(auth(...[ 'getAllByAdminInDesktopPlatform', 'getAllByUserInDesktopPlatform' ]),checkRolePermission,userController.findAllUser);
router.route('/desktop/api/v1/user/:id').get(auth(...[ 'getByAdminInDesktopPlatform', 'getByUserInDesktopPlatform' ]),checkRolePermission,userController.getUser);
router.route('/desktop/api/v1/user/count').post(auth(...[
  'getCountByAdminInDesktopPlatform',
  'getCountByUserInDesktopPlatform'
]),checkRolePermission,userController.getUserCount);
router.route('/desktop/api/v1/user/update/:id').put(auth(...[ 'updateByAdminInDesktopPlatform', 'updateByUserInDesktopPlatform' ]),checkRolePermission,userController.updateUser);    
router.route('/desktop/api/v1/user/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInDesktopPlatform',
  'partialUpdateByUserInDesktopPlatform'
]),checkRolePermission,userController.partialUpdateUser);
router.route('/desktop/api/v1/user/softDelete/:id').put(auth(...[
  'softDeleteByAdminInDesktopPlatform',
  'softDeleteByUserInDesktopPlatform'
]),checkRolePermission,userController.softDeleteUser);
router.route('/desktop/api/v1/user/softDeleteMany').put(auth(...[
  'softDeleteManyByAdminInDesktopPlatform',
  'softDeleteManyByUserInDesktopPlatform'
]),checkRolePermission,userController.softDeleteManyUser);
router.route('/desktop/api/v1/user/addBulk').post(auth(...[ 'addBulkByAdminInDesktopPlatform', 'addBulkByUserInDesktopPlatform' ]),checkRolePermission,userController.bulkInsertUser);
router.route('/desktop/api/v1/user/updateBulk').put(auth(...[
  'updateBulkByAdminInDesktopPlatform',
  'updateBulkByUserInDesktopPlatform'
]),checkRolePermission,userController.bulkUpdateUser);
router.route('/desktop/api/v1/user/change-password').put(auth(...[
  'changePasswordByAdminInDesktopPlatform',
  'changePasswordByUserInDesktopPlatform'
]),userController.changePassword);
router.route('/desktop/api/v1/user/update-profile').put(auth(...[
  'updateProfileByAdminInDesktopPlatform',
  'updateProfileByUserInDesktopPlatform'
]),userController.updateProfile);

module.exports = router;
