const express = require('express');
const router = express.Router();
const userController = require('../../controller/admin/userController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/user/create').post(auth(...[ 'createByAdminInAdminPlatform', 'createByUserInAdminPlatform' ]),checkRolePermission,userController.addUser);
router.route('/admin/user/list').post(auth(...[ 'getAllByAdminInAdminPlatform', 'getAllByUserInAdminPlatform' ]),checkRolePermission,userController.findAllUser);
router.route('/admin/user/:id').get(auth(...[ 'getByAdminInAdminPlatform', 'getByUserInAdminPlatform' ]),checkRolePermission,userController.getUser);
router.route('/admin/user/count').post(auth(...[ 'getCountByAdminInAdminPlatform', 'getCountByUserInAdminPlatform' ]),checkRolePermission,userController.getUserCount);
router.route('/admin/user/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform', 'updateByUserInAdminPlatform' ]),checkRolePermission,userController.updateUser);    
router.route('/admin/user/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInAdminPlatform',
  'partialUpdateByUserInAdminPlatform'
]),checkRolePermission,userController.partialUpdateUser);
router.route('/admin/user/softDelete/:id').put(auth(...[
  'softDeleteByAdminInAdminPlatform',
  'softDeleteByUserInAdminPlatform'
]),checkRolePermission,userController.softDeleteUser);
router.route('/admin/user/softDeleteMany').put(auth(...[
  'softDeleteManyByAdminInAdminPlatform',
  'softDeleteManyByUserInAdminPlatform'
]),checkRolePermission,userController.softDeleteManyUser);
router.route('/admin/user/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform', 'addBulkByUserInAdminPlatform' ]),checkRolePermission,userController.bulkInsertUser);
router.route('/admin/user/updateBulk').put(auth(...[
  'updateBulkByAdminInAdminPlatform',
  'updateBulkByUserInAdminPlatform'
]),checkRolePermission,userController.bulkUpdateUser);
router.route('/admin/user/change-password').put(auth(...[
  'changePasswordByAdminInAdminPlatform',
  'changePasswordByUserInAdminPlatform'
]),userController.changePassword);
router.route('/admin/user/update-profile').put(auth(...[
  'updateProfileByAdminInAdminPlatform',
  'updateProfileByUserInAdminPlatform'
]),userController.updateProfile);

module.exports = router;
