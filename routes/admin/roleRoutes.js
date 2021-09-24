const express = require('express');
const router = express.Router();
const roleController = require('../../controller/admin/roleController');
const auth = require('../../middleware/auth');
router.route('/admin/role/create').post(auth(...[ 'createByAdminInAdminPlatform', 'createByUserInAdminPlatform' ]),roleController.addRole);
router.route('/admin/role/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform', 'addBulkByUserInAdminPlatform' ]),roleController.bulkInsertRole);
router.route('/admin/role/list').post(auth(...[ 'getAllByAdminInAdminPlatform', 'getAllByUserInAdminPlatform' ]),roleController.findAllRole);
router.route('/admin/role/:id').get(auth(...[ 'getByAdminInAdminPlatform', 'getByUserInAdminPlatform' ]),roleController.getRole);
router.route('/admin/role/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInAdminPlatform',
  'partialUpdateByUserInAdminPlatform'
]),roleController.partialUpdateRole);
router.route('/admin/role/softDelete/:id').put(auth(...[
  'softDeleteByAdminInAdminPlatform',
  'softDeleteByUserInAdminPlatform'
]),roleController.softDeleteRole);
router.route('/admin/role/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform', 'updateByUserInAdminPlatform' ]),roleController.updateRole);    
router.route('/admin/role/count').post(auth(...[ 'getCountByAdminInAdminPlatform', 'getCountByUserInAdminPlatform' ]),roleController.getRoleCount);
router.route('/admin/role/upsert').post(auth(...[ 'upsertByAdminInAdminPlatform', 'upsertByUserInAdminPlatform' ]),roleController.upsert);

module.exports = router;