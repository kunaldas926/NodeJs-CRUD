let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserToken = require('../model/userToken');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');
const { Op } = require('sequelize');

const deleteUser = async (filter) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user?.length){
      user = user.map((obj) => obj.id);
      const userFilter7081 = { 'addedBy': { [Op.in]: user } };
      const user2502 = await deleteUser(userFilter7081);
      const userFilter5499 = { 'updatedBy': { [Op.in]: user } };
      const user1409 = await deleteUser(userFilter5499);
      const userAuthSettingsFilter4198 = { 'userId': { [Op.in]: user } };
      const userAuthSettings4742 = await deleteUserAuthSettings(userAuthSettingsFilter4198);
      const userTokenFilter6369 = { 'userId': { [Op.in]: user } };
      const userToken2002 = await deleteUserToken(userTokenFilter6369);
      const userRoleFilter4096 = { 'userId': { [Op.in]: user } };
      const userRole8132 = await deleteUserRole(userRoleFilter4096);
      return await User.destroy({ where :filter });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    return await UserAuthSettings.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserToken = async (filter) =>{
  try {
    return await UserToken.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role?.length){
      role = role.map((obj) => obj.id);
      const routeRoleFilter0218 = { 'roleId': { [Op.in]: role } };
      const routeRole0662 = await deleteRouteRole(routeRoleFilter0218);
      const userRoleFilter3236 = { 'roleId': { [Op.in]: role } };
      const userRole7095 = await deleteUserRole(userRoleFilter3236);
      return await Role.destroy({ where :filter });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute?.length){
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter7090 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole3017 = await deleteRouteRole(routeRoleFilter7090);
      return await ProjectRoute.destroy({ where :filter });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user?.length){
      user = user.map((obj) => obj.id);
      const userFilter4475 = { 'addedBy': { [Op.in]: user } };
      const user7554Cnt = await countUser(userFilter4475);
      const userFilter7358 = { 'updatedBy': { [Op.in]: user } };
      const user0230Cnt = await countUser(userFilter7358);
      const userAuthSettingsFilter9241 = { 'userId': { [Op.in]: user } };
      const userAuthSettings1957Cnt = await countUserAuthSettings(userAuthSettingsFilter9241);
      const userTokenFilter3725 = { 'userId': { [Op.in]: user } };
      const userToken2034Cnt = await countUserToken(userTokenFilter3725);
      const userRoleFilter5473 = { 'userId': { [Op.in]: user } };
      const userRole4039Cnt = await countUserRole(userRoleFilter5473);
      const userCnt =  await User.count(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...user7554Cnt,
        ...user0230Cnt,
        ...userAuthSettings1957Cnt,
        ...userToken2034Cnt,
        ...userRole4039Cnt,
      };
      return response;
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await UserAuthSettings.count(filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserToken = async (filter) =>{
  try {
    const userTokenCnt =  await UserToken.count(filter);
    return { userToken : userTokenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role?.length){
      role = role.map((obj) => obj.id);
      const routeRoleFilter1825 = { 'roleId': { [Op.in]: role } };
      const routeRole2980Cnt = await countRouteRole(routeRoleFilter1825);
      const userRoleFilter8237 = { 'roleId': { [Op.in]: role } };
      const userRole4981Cnt = await countUserRole(userRoleFilter8237);
      const roleCnt =  await Role.count(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole2980Cnt,
        ...userRole4981Cnt,
      };
      return response;
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute?.length){
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter3478 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole4637Cnt = await countRouteRole(routeRoleFilter3478);
      const projectRouteCnt =  await ProjectRoute.count(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole4637Cnt,
      };
      return response;
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.count(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.count(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,loggedInUserId) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user?.length){
      user = user.map((obj) => obj.id);
      const userFilter6124 = { 'addedBy': { [Op.in]: user } };
      const user3668 = await softDeleteUser(userFilter6124,loggedInUserId);
      const userFilter0765 = { 'updatedBy': { [Op.in]: user } };
      const user4125 = await softDeleteUser(userFilter0765,loggedInUserId);
      const userAuthSettingsFilter5631 = { 'userId': { [Op.in]: user } };
      const userAuthSettings7671 = await softDeleteUserAuthSettings(userAuthSettingsFilter5631,loggedInUserId);
      const userTokenFilter6464 = { 'userId': { [Op.in]: user } };
      const userToken6225 = await softDeleteUserToken(userTokenFilter6464,loggedInUserId);
      const userRoleFilter5200 = { 'userId': { [Op.in]: user } };
      const userRole6398 = await softDeleteUserRole(userRoleFilter5200,loggedInUserId);
      if (loggedInUserId){
        return await User.update(
          {
            isDeleted:true,
            updatedBy:loggedInUserId
          },{
            fields: ['isDeleted','updatedBy'],
            where: filter ,
          });
      } else {
        return await User.update(
          { isDeleted:true },{
            fields: ['isDeleted'],
            where: filter ,
          });
      }
 
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,loggedInUserId) =>{
  try {
    if (loggedInUserId){
      return await UserAuthSettings.update(
        {
          isDeleted:true,
          updatedBy:loggedInUserId
        },{
          fields: ['isDeleted','updatedBy'],
          where: filter ,
        });
    } else {
      return await UserAuthSettings.update(
        { isDeleted:true },{
          fields: ['isDeleted'],
          where: filter,
        });
    }
        
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserToken = async (filter,loggedInUserId) =>{
  try {
    if (loggedInUserId){
      return await UserToken.update(
        {
          isDeleted:true,
          updatedBy:loggedInUserId
        },{
          fields: ['isDeleted','updatedBy'],
          where: filter ,
        });
    } else {
      return await UserToken.update(
        { isDeleted:true },{
          fields: ['isDeleted'],
          where: filter,
        });
    }
        
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,loggedInUserId) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role?.length){
      role = role.map((obj) => obj.id);
      const routeRoleFilter6670 = { 'roleId': { [Op.in]: role } };
      const routeRole3191 = await softDeleteRouteRole(routeRoleFilter6670,loggedInUserId);
      const userRoleFilter2197 = { 'roleId': { [Op.in]: role } };
      const userRole7823 = await softDeleteUserRole(userRoleFilter2197,loggedInUserId);
      if (loggedInUserId){
        return await Role.update(
          {
            isDeleted:true,
            updatedBy:loggedInUserId
          },{
            fields: ['isDeleted','updatedBy'],
            where: filter ,
          });
      } else {
        return await Role.update(
          { isDeleted:true },{
            fields: ['isDeleted'],
            where: filter ,
          });
      }
 
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,loggedInUserId) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute?.length){
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter8499 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole0671 = await softDeleteRouteRole(routeRoleFilter8499,loggedInUserId);
      if (loggedInUserId){
        return await ProjectRoute.update(
          {
            isDeleted:true,
            updatedBy:loggedInUserId
          },{
            fields: ['isDeleted','updatedBy'],
            where: filter ,
          });
      } else {
        return await ProjectRoute.update(
          { isDeleted:true },{
            fields: ['isDeleted'],
            where: filter ,
          });
      }
 
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,loggedInUserId) =>{
  try {
    if (loggedInUserId){
      return await RouteRole.update(
        {
          isDeleted:true,
          updatedBy:loggedInUserId
        },{
          fields: ['isDeleted','updatedBy'],
          where: filter ,
        });
    } else {
      return await RouteRole.update(
        { isDeleted:true },{
          fields: ['isDeleted'],
          where: filter,
        });
    }
        
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,loggedInUserId) =>{
  try {
    if (loggedInUserId){
      return await UserRole.update(
        {
          isDeleted:true,
          updatedBy:loggedInUserId
        },{
          fields: ['isDeleted','updatedBy'],
          where: filter ,
        });
    } else {
      return await UserRole.update(
        { isDeleted:true },{
          fields: ['isDeleted'],
          where: filter,
        });
    }
        
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteUserAuthSettings,
  deleteUserToken,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countUserAuthSettings,
  countUserToken,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserToken,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
