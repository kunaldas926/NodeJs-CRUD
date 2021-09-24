const express = require('express');
const router = express.Router();
const userRoleController = require('../../controller/admin/userRoleController');
const auth = require('../../middleware/auth');
router.route('/admin/userRole/create').post(auth(...[ 'createByAdminInAdminPlatform', 'createByUserInAdminPlatform' ]),userRoleController.addUserRole);
router.route('/admin/userRole/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform', 'addBulkByUserInAdminPlatform' ]),userRoleController.bulkInsertUserRole);
router.route('/admin/userRole/list').post(auth(...[ 'getAllByAdminInAdminPlatform', 'getAllByUserInAdminPlatform' ]),userRoleController.findAllUserRole);
router.route('/admin/userRole/:id').get(auth(...[ 'getByAdminInAdminPlatform', 'getByUserInAdminPlatform' ]),userRoleController.getUserRole);
router.route('/admin/userRole/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInAdminPlatform',
  'partialUpdateByUserInAdminPlatform'
]),userRoleController.partialUpdateUserRole);
router.route('/admin/userRole/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform', 'updateByUserInAdminPlatform' ]),userRoleController.updateUserRole);    
router.route('/admin/userRole/softDelete/:id').put(auth(...[
  'softDeleteByAdminInAdminPlatform',
  'softDeleteByUserInAdminPlatform'
]),userRoleController.softDeleteUserRole);
router.route('/admin/userRole/count').post(auth(...[ 'getCountByAdminInAdminPlatform', 'getCountByUserInAdminPlatform' ]),userRoleController.getUserRoleCount);
router.route('/admin/userRole/upsert').post(auth(...[ 'upsertByAdminInAdminPlatform', 'upsertByUserInAdminPlatform' ]),userRoleController.upsert);

module.exports = router;
