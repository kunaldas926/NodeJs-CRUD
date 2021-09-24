const { Op } = require('sequelize');
const ProjectRoute = require('../../model/projectRoute');
const projectRouteSchemaKey = require('../../utils/validation/projectRouteValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const addProjectRoute = async (req, res) => {
  try {

    let isValid = validation.validateParamsWithJoi(
      req.body,
      projectRouteSchemaKey.schemaKeys);
    if (isValid.error) {
      return res.inValidParam(isValid.error);
    } 
    delete req.body['addedBy'];
    delete req.body['updatedBy'];
    const data = ({
      ...req.body,
      addedBy:req.user.id
    });
    let result = await dbService.createOne(ProjectRoute,data);
    return  res.ok(result);
  } catch (error) {
    return res.failureResponse(error.message); 
  }
};

const bulkInsertProjectRoute = async (req, res)=>{
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

      let result = await dbService.createMany(ProjectRoute,data);
      return  res.ok(result);
    } else {
      return res.failureResponse('Invalid Data');
    }  
  } catch (error){
    return res.failureResponse(error.message);
  }
};

const findAllProjectRoute = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body && req.body.isCountOnly){
      if (req.body.query !== undefined) {
        query = { ...req.body.query };
      }
      query = dbService.queryBuilderParser(query);
      result = await dbService.count(ProjectRoute, query);
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
      result = await dbService.findMany( ProjectRoute,query,options);
            
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

const getProjectRoute = async (req, res) => {
  try {
    let query = {};

    let id = req.params.id;
        
    let result = await dbService.findByPk(ProjectRoute,id,query);
    if (result){
      return  res.ok(result);
            
    }
    return res.recordNotFound({});
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const partialUpdateProjectRoute = async (req, res) => {
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
      projectRouteSchemaKey.updateSchemaKeys
    );
    if (isValid.error) {
      return res.inValidParam(isValid.error);
    }

    const query = { id:req.params.id };
    let result = await dbService.updateMany(ProjectRoute, query, data);
    if (!result) {
      return res.failureResponse('something is wrong');
    }
        
    return res.ok(result);
        
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const softDeleteProjectRoute = async (req, res) => {
  try {
    let possibleDependent = [ {
      model: 'routeRole',
      refId: 'routeId',
      relType: 2 
    } ];
    let id = req.params.id;
    let query = { id:id };
        
    let result = await deleteDependentService.softDeleteProjectRoute(query,req.user.id);
    if (!result){
      return res.failureResponse('something went wrong');
    }
    return  res.ok(result);
  } catch (error){
    return res.failureResponse(error.message); 
  }
};

const updateProjectRoute = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.addedBy;
    delete data.updatedBy;
    data.updatedBy = req.user.id;
    let isValid = validation.validateParamsWithJoi(
      data,
      projectRouteSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return  res.inValidParam(isValid.error);
    }

    let query = { id:req.params.id };
    let result = await dbService.updateMany(ProjectRoute,query,data);
    if (!result){
      return res.failureResponse('something is wrong');
    }

    return  res.ok(result);
  }
  catch (error){
    return res.failureResponse(error.message);
  }
};

const getProjectRouteCount = async (req, res) => {
  try {
    let where = {};
    if (req.body.where){
      where = req.body.where;
    }
    let result = await dbService.count(ProjectRoute,where);
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

const upsert = async (req, res) => {
  try {
    let params = req.body;
    let isValid = validation.validateParamsWithJoi(
      params,
      projectRouteSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return res.inValidParam(isValid.error);
    }

    let result = await dbService.upsert(ProjectRoute,req.body);

    return  res.ok(result);    
  }
  catch (error){
    return res.failureResponse(error.message); 
  }
};

module.exports = {
  addProjectRoute,
  bulkInsertProjectRoute,
  findAllProjectRoute,
  getProjectRoute,
  partialUpdateProjectRoute,
  softDeleteProjectRoute,
  updateProjectRoute,
  getProjectRouteCount,
  upsert,
};
