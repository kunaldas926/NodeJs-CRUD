/*
 * constants
 */

const JWT = {
  ADMIN_SECRET:'myjwtadminsecret',
  DEVICE_SECRET:'myjwtdevicesecret',
  DESKTOP_SECRET:'myjwtdesktopsecret',
  CLIENT_SECRET:'myjwtclientsecret',
  EXPIRES_IN: 10000
};

const USER_ROLE = {
        
  Admin :1,
  User:2,
};

const PLATFORM = {
  ADMIN:1,
  DEVICE:2,
  DESKTOP:3,
  CLIENT:4,
};

let LOGIN_ACCESS = {
  [USER_ROLE.Admin]:[PLATFORM.ADMIN,PLATFORM.DEVICE,PLATFORM.DESKTOP,PLATFORM.CLIENT],        
  [USER_ROLE.User]:[PLATFORM.ADMIN,PLATFORM.DEVICE,PLATFORM.DESKTOP,PLATFORM.CLIENT],        
};

const DEFAULT_ROLE = 1;

const ROLE_RIGHTS = {
    
  [USER_ROLE.Admin] : [
    'getAllByAdminInAdminPlatform',
    'getByAdminInAdminPlatform',
    'aggregateByAdminInAdminPlatform',
    'getCountByAdminInAdminPlatform',
    'createByAdminInAdminPlatform',
    'addBulkByAdminInAdminPlatform',
    'updateByAdminInAdminPlatform',
    'updateBulkByAdminInAdminPlatform',
    'partialUpdateByAdminInAdminPlatform',
    'deleteByAdminInAdminPlatform',
    'softDeleteByAdminInAdminPlatform',
    'upsertByAdminInAdminPlatform',
    'fileUploadByAdminInAdminPlatform',
    'logoutByAdminInAdminPlatform',
    'softDeleteManyByAdminInAdminPlatform',
    'deleteManyByAdminInAdminPlatform',
    'changePasswordByAdminInAdminPlatform',
    'updateProfileByAdminInAdminPlatform',
    'getAllByAdminInDevicePlatform',
    'getByAdminInDevicePlatform',
    'aggregateByAdminInDevicePlatform',
    'getCountByAdminInDevicePlatform',
    'createByAdminInDevicePlatform',
    'addBulkByAdminInDevicePlatform',
    'updateByAdminInDevicePlatform',
    'updateBulkByAdminInDevicePlatform',
    'partialUpdateByAdminInDevicePlatform',
    'deleteByAdminInDevicePlatform',
    'softDeleteByAdminInDevicePlatform',
    'upsertByAdminInDevicePlatform',
    'fileUploadByAdminInDevicePlatform',
    'logoutByAdminInDevicePlatform',
    'softDeleteManyByAdminInDevicePlatform',
    'deleteManyByAdminInDevicePlatform',
    'changePasswordByAdminInDevicePlatform',
    'updateProfileByAdminInDevicePlatform',
    'getAllByAdminInDesktopPlatform',
    'getByAdminInDesktopPlatform',
    'aggregateByAdminInDesktopPlatform',
    'getCountByAdminInDesktopPlatform',
    'createByAdminInDesktopPlatform',
    'addBulkByAdminInDesktopPlatform',
    'updateByAdminInDesktopPlatform',
    'updateBulkByAdminInDesktopPlatform',
    'partialUpdateByAdminInDesktopPlatform',
    'deleteByAdminInDesktopPlatform',
    'softDeleteByAdminInDesktopPlatform',
    'upsertByAdminInDesktopPlatform',
    'fileUploadByAdminInDesktopPlatform',
    'logoutByAdminInDesktopPlatform',
    'softDeleteManyByAdminInDesktopPlatform',
    'deleteManyByAdminInDesktopPlatform',
    'changePasswordByAdminInDesktopPlatform',
    'updateProfileByAdminInDesktopPlatform',
    'getAllByAdminInClientPlatform',
    'getByAdminInClientPlatform',
    'aggregateByAdminInClientPlatform',
    'getCountByAdminInClientPlatform',
    'createByAdminInClientPlatform',
    'addBulkByAdminInClientPlatform',
    'updateByAdminInClientPlatform',
    'updateBulkByAdminInClientPlatform',
    'partialUpdateByAdminInClientPlatform',
    'deleteByAdminInClientPlatform',
    'softDeleteByAdminInClientPlatform',
    'upsertByAdminInClientPlatform',
    'fileUploadByAdminInClientPlatform',
    'logoutByAdminInClientPlatform',
    'softDeleteManyByAdminInClientPlatform',
    'deleteManyByAdminInClientPlatform',
    'changePasswordByAdminInClientPlatform',
    'updateProfileByAdminInClientPlatform'
  ],
    
  [USER_ROLE.User] : [
    'getAllByUserInAdminPlatform',
    'getByUserInAdminPlatform',
    'aggregateByUserInAdminPlatform',
    'getCountByUserInAdminPlatform',
    'createByUserInAdminPlatform',
    'addBulkByUserInAdminPlatform',
    'updateByUserInAdminPlatform',
    'updateBulkByUserInAdminPlatform',
    'partialUpdateByUserInAdminPlatform',
    'deleteByUserInAdminPlatform',
    'softDeleteByUserInAdminPlatform',
    'upsertByUserInAdminPlatform',
    'fileUploadByUserInAdminPlatform',
    'logoutByUserInAdminPlatform',
    'softDeleteManyByUserInAdminPlatform',
    'deleteManyByUserInAdminPlatform',
    'changePasswordByUserInAdminPlatform',
    'updateProfileByUserInAdminPlatform',
    'getAllByUserInDevicePlatform',
    'getByUserInDevicePlatform',
    'aggregateByUserInDevicePlatform',
    'getCountByUserInDevicePlatform',
    'createByUserInDevicePlatform',
    'addBulkByUserInDevicePlatform',
    'updateByUserInDevicePlatform',
    'updateBulkByUserInDevicePlatform',
    'partialUpdateByUserInDevicePlatform',
    'deleteByUserInDevicePlatform',
    'softDeleteByUserInDevicePlatform',
    'upsertByUserInDevicePlatform',
    'fileUploadByUserInDevicePlatform',
    'logoutByUserInDevicePlatform',
    'softDeleteManyByUserInDevicePlatform',
    'deleteManyByUserInDevicePlatform',
    'changePasswordByUserInDevicePlatform',
    'updateProfileByUserInDevicePlatform',
    'getAllByUserInDesktopPlatform',
    'getByUserInDesktopPlatform',
    'aggregateByUserInDesktopPlatform',
    'getCountByUserInDesktopPlatform',
    'createByUserInDesktopPlatform',
    'addBulkByUserInDesktopPlatform',
    'updateByUserInDesktopPlatform',
    'updateBulkByUserInDesktopPlatform',
    'partialUpdateByUserInDesktopPlatform',
    'deleteByUserInDesktopPlatform',
    'softDeleteByUserInDesktopPlatform',
    'upsertByUserInDesktopPlatform',
    'fileUploadByUserInDesktopPlatform',
    'logoutByUserInDesktopPlatform',
    'softDeleteManyByUserInDesktopPlatform',
    'deleteManyByUserInDesktopPlatform',
    'changePasswordByUserInDesktopPlatform',
    'updateProfileByUserInDesktopPlatform',
    'getAllByUserInClientPlatform',
    'getByUserInClientPlatform',
    'aggregateByUserInClientPlatform',
    'getCountByUserInClientPlatform',
    'createByUserInClientPlatform',
    'addBulkByUserInClientPlatform',
    'updateByUserInClientPlatform',
    'updateBulkByUserInClientPlatform',
    'partialUpdateByUserInClientPlatform',
    'deleteByUserInClientPlatform',
    'softDeleteByUserInClientPlatform',
    'upsertByUserInClientPlatform',
    'fileUploadByUserInClientPlatform',
    'logoutByUserInClientPlatform',
    'softDeleteManyByUserInClientPlatform',
    'deleteManyByUserInClientPlatform',
    'changePasswordByUserInClientPlatform',
    'updateProfileByUserInClientPlatform'
  ],
    
};
const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 30;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    sms: true,
    email: true
  },
  EXPIRETIME: 10
};
const NO_OF_DEVICE_ALLOWED = 1;

module.exports = {
  JWT,
  USER_ROLE,
  DEFAULT_ROLE,
  ROLE_RIGHTS,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  NO_OF_DEVICE_ALLOWED,
  LOGIN_ACCESS,
        
};