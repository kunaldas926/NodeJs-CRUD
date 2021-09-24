const { Op } = require('sequelize');
const User = require('../../model/user');
const userSchemaKey = require('../../utils/validation/userValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const auth = require('../../services/auth');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const addUser = async (req, res) => {
  try {

    let isValid = validation.validateParamsWithJoi(
      req.body,
      userSchemaKey.schemaKeys);
    if (isValid.error) {
      return res.inValidParam(isValid.error);
    } 
    delete req.body['addedBy'];
    delete req.body['updatedBy'];
    const data = ({
      ...req.body,
      addedBy:req.user.id
    });
    let result = await dbService.createOne(User,data);
    return  res.ok(result);
  } catch (error) {
    return res.failureResponse(error.message); 
  }
};

const findAllUser = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body && req.body.isCountOnly){
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      query = dbService.queryBuilderParser(query);
      if (req.user){
        query = {
          ...query,
          ...{ 'id': { [Op.ne]: req.user.id } } 
        };
        if (req.body && req.body.query && req.body.query.id) {
          Object.assign(query.id, { [Op.in]: [req.body.query.id] });
        }
      }
      result = await dbService.count(User, query);
      if (result) {
        result = { totalRecords: result };
        return res.ok(result);
      } 
      return res.recordNotFound({});
    }
    else {
      if (req.body && req.body.options !== undefined) {
        options = { ...req.body.options };
      }
      if (options && options.select && options.select.length){
        options.attributes = options.select;
      }
            
      if (req.body.query !== undefined){
        query = { ...req.body.query };
      }
      query = dbService.queryBuilderParser(query);
      if (options && options.include && options.include.length){
        let include = [];
        options.include.forEach(i => {
          i.model = models[i.model];
          if (i.query) {
            i.where = dbService.queryBuilderParser(i.query);
          }
          include.push(i);
        });
        options.include = include;
      }
      if (options && options.sort){
        options.order = dbService.sortParser(options.sort);
        delete options.sort;
      }
      if (req.user){
        query = {
          ...query,
          ...{ 'id': { [Op.ne]: req.user.id } } 
        };
        if (req.body && req.body.query && req.body.query.id) {
          Object.assign(query.id, { [Op.in]: [req.body.query.id] });
        }
      }
      result = await dbService.findMany( User,query,options);
            
      if (!result){
        return res.recordNotFound({});
      }
      return res.ok(result);   
    }
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    let query = {};

    let id = req.params.id;
        
    let result = await dbService.findByPk(User,id,query);
    if (result){
      return  res.ok(result);
            
    }
    return res.recordNotFound({});
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const getUserCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where){
      where = req.body.where;
    }
    let result = await dbService.count(User,where);
    if (result){
      result = { totalRecords:result };
      return res.ok(result);
    }
    return res.recordNotFound({});
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = req.user.id;
    let isValid = validation.validateParamsWithJoi(
      data,
      userSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return  res.inValidParam(isValid.error);
    }

    let query = {};
    if (req.user){
      query = {
        'id': {
          [Op.eq]: req.params.id,
          [Op.ne]: req.user.id
        }
      };
    } else {
      return res.badRequest({});
    }
    let result = await dbService.updateMany(User,query,data);
    if (!result){
      return res.failureResponse('something is wrong');
    }

    return  res.ok(result);
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const partialUpdateUser = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.params.id
    };
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = req.user.id;
    let isValid = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return res.inValidParam(isValid.error);
    }

    let query = {};
    if (req.user){
      query = {
        'id': {
          [Op.eq]: req.params.id,
          [Op.ne]: req.user.id
        }
      };
    } else {
      return res.badRequest({});
    } 
    let result = await dbService.updateMany(User, query, data);
    if (!result) {
      return res.failureResponse('something is wrong');
    }
        
    return res.ok(result);
        
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const softDeleteUser = async (req, res) => {
  try {
    let possibleDependent = [
      {
        model: 'user',
        refId: 'addedBy',
        relType: 'HAS_MANY' 
      },
      {
        model: 'user',
        refId: 'updatedBy',
        relType: 'HAS_MANY' 
      },
      {
        model: 'userAuthSettings',
        refId: 'userId',
        relType: 2 
      },
      {
        model: 'userToken',
        refId: 'userId',
        relType: 2 
      },
      {
        model: 'userRole',
        refId: 'userId',
        relType: 2 
      }
    ];
    let id = req.params.id;
    let query = {};
    if (req.user){
      query = {
        'id': {
          [Op.eq]: id,
          [Op.ne]: req.user.id
        }
      };
    } 
        
    let result = await deleteDependentService.softDeleteUser(query,req.user.id);
    if (!result){
      return res.failureResponse('something went wrong');
    }
    return  res.ok(result);
  } catch (error){
    return res.failureResponse(error.message); 
  }
};

const softDeleteManyUser = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (ids){
      let query = {};
      if (req.user){
        query = {
          'id': {
            [Op.in]: ids,
            [Op.ne]: req.user.id
          }
        };
      } 
      let result = await deleteDependentService.softDeleteUser(query,req.user.id);
      if (!result) {
        return res.recordNotFound({});
      }
      return  res.ok(result);
    }
    return res.badRequest({});
  } catch (error){
    return res.failureResponse(error.message); 
  }
};

const bulkInsertUser = async (req, res)=>{
  try {
    let data;   
    if (req.body.data !== undefined && req.body.data.length){
      data = req.body.data;
      data = data.map(item=>{
        delete item.addedBy;
        delete item.updatedBy;
        item.addedBy = req.user.id;
        return item;
      });        

      let result = await dbService.createMany(User,data);
      return  res.ok(result);
    } else {
      return res.failureResponse('Invalid Data');
    }  
  } catch (error){
    return res.failureResponse(error.message);
  }
};

const bulkUpdateUser = async (req, res)=>{
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined){
      filter = req.body.filter;
    }
    if (req.body.data !== undefined){
      data = req.body.data;
      let result = await dbService.updateMany(User,filter,data);
      if (!result){
        return res.failureResponse('something is wrong.');
      }

      return  res.ok(result);
    }
    else {
      return res.failureResponse('Invalid Data');
    }
  }
  catch (error){
    return res.failureResponse(error.message); 
  }
};

const changePassword = async (req, res) => {
  try {
    let params = req.body;
    if (!params.newPassword || !req.user.id || !params.oldPassword) {
      return res.inValidParam({});
    }
    let result = await auth.changePassword({
      ...params,
      userId:req.user.id
    });
    if (result.flag){
      return res.invalidRequest(result.data);
    }
    return res.requestValidated(result.data);
  } catch (error) {
    return res.failureResponse(error.message);
  }
};
const updateProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id:req.user.id
    };
    let isValid = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return  res.inValidParam(isValid.error);
    }
    if (data.password) delete data.password;
    if (data.createdAt) delete data.createdAt;
    if (data.updatedAt) delete data.updatedAt;
    if (data.id) delete data.id;
    let result = await dbService.updateByPk(User, req.user.id ,data);
    if (!result){
      return res.failureResponse('something is wrong');
    }            
    return  res.ok(result);
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

module.exports = {
  addUser,
  findAllUser,
  getUser,
  getUserCount,
  updateUser,
  partialUpdateUser,
  softDeleteUser,
  softDeleteManyUser,
  bulkInsertUser,
  bulkUpdateUser,
  changePassword,
  updateProfile,
};
