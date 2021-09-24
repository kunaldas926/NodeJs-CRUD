const express = require('express');
const router = express.Router();
const routeRoleController = require('../../controller/admin/routeRoleController');
const auth = require('../../middleware/auth');
router.route('/admin/routeRole/create').post(auth(...[ 'createByAdminInAdminPlatform', 'createByUserInAdminPlatform' ]),routeRoleController.addRouteRole);
router.route('/admin/routeRole/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform', 'addBulkByUserInAdminPlatform' ]),routeRoleController.bulkInsertRouteRole);
router.route('/admin/routeRole/list').post(auth(...[ 'getAllByAdminInAdminPlatform', 'getAllByUserInAdminPlatform' ]),routeRoleController.findAllRouteRole);
router.route('/admin/routeRole/:id').get(auth(...[ 'getByAdminInAdminPlatform', 'getByUserInAdminPlatform' ]),routeRoleController.getRouteRole);
router.route('/admin/routeRole/partial-update/:id').put(auth(...[
  'partialUpdateByAdminInAdminPlatform',
  'partialUpdateByUserInAdminPlatform'
]),routeRoleController.partialUpdateRouteRole);
router.route('/admin/routeRole/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform', 'updateByUserInAdminPlatform' ]),routeRoleController.updateRouteRole);    
router.route('/admin/routeRole/softDelete/:id').put(auth(...[
  'softDeleteByAdminInAdminPlatform',
  'softDeleteByUserInAdminPlatform'
]),routeRoleController.softDeleteRouteRole);
router.route('/admin/routeRole/count').post(auth(...[ 'getCountByAdminInAdminPlatform', 'getCountByUserInAdminPlatform' ]),routeRoleController.getRouteRoleCount);
router.route('/admin/routeRole/upsert').post(auth(...[ 'upsertByAdminInAdminPlatform', 'upsertByUserInAdminPlatform' ]),routeRoleController.upsert);

module.exports = router;
