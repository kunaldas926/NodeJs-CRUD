/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 *
 */

const joi = require('joi');
exports.schemaKeys = joi.object({
  isActive: joi.boolean().allow(null,''),
  isDeleted: joi.boolean().allow(null,'')
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  isActive: joi.boolean().allow(null,''),
  isDeleted: joi.boolean().allow(null,'')
}).unknown(true);
