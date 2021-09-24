const express = require('express');
const router = express.Router();
const projectRouteController = require('../../controller/admin/projectRouteController');
const auth = require('../../middleware/auth');
router.route('/admin/projectRoute/create').post(auth(...[ 'createByAdminInAdminPlatform', 'createByUserInAdminPlatform' ]),projectRouteController.addProjectRoute);
router.route('/admin/projectRoute/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform', 'addBulkByUserInAdminPlatform' ]),projectRouteController.bulkInsertProjectRoute);
router.route('/admin/projectRoute/list').post(auth(...[ 'getAllByAdminInAdminPlatform', 'getAllByUserInAdminPlatform' ]),projectRouteController.findAllProjectRoute);
router.route('/admin/projectRoute/:id').get(auth(...[ 'getByAdminInAdminPlatform', 'getByUserInAdminPlatform' ]),projectRouteController.getProjectRoute);
router.route('/admin/projectRoute/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInAdminPlatform',
  'partialUpdateByUserInAdminPlatform'
]),projectRouteController.partialUpdateProjectRoute);
router.route('/admin/projectRoute/softDelete/:id').put(auth(...[
  'softDeleteByAdminInAdminPlatform',
  'softDeleteByUserInAdminPlatform'
]),projectRouteController.softDeleteProjectRoute);
router.route('/admin/projectRoute/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform', 'updateByUserInAdminPlatform' ]),projectRouteController.updateProjectRoute);    
router.route('/admin/projectRoute/count').post(auth(...[ 'getCountByAdminInAdminPlatform', 'getCountByUserInAdminPlatform' ]),projectRouteController.getProjectRouteCount);
router.route('/admin/projectRoute/upsert').post(auth(...[ 'upsertByAdminInAdminPlatform', 'upsertByUserInAdminPlatform' ]),projectRouteController.upsert);

module.exports = router;
