const authService =  require('../../services/auth');
const model = require('../../model/index');
const dbService = require('../../utils/dbService');
const moment = require('moment');
const userSchemaKey = require('../../utils/validation/userValidation');
const validation = require('../../utils/validateRequest');
const { uniqueValidation } = require('../../utils/common');
    
module.exports = {
  /*
   * api: user register 
   * description : first time user registration.
   */
  register : async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        userSchemaKey.schemaKeys
      );
      if (isValid.error) {
        return res.inValidParam(isValid.error);
      }
      let unique = await uniqueValidation(model.user,req.body);   
      if (!unique){ 
        return res.inValidParam('User Registration Failed, Duplicate Data found');
      }     
      const result = await dbService.createOne(model.user,{ ...req.body });
      return  res.ok(result);
    } catch (error) {
      return res.failureResponse(error.message);
    }  
  },
  /*
   * api : forgot password
   * description : send email or sms to user for forgot password.
   */
  forgotPassword: async (req, res) => {
    const params = req.body;
    try {
      if (!params.email) {
        return res.insufficientParameters();
      }
      let where = { email: params.email };
      params.email = params.email.toString().toLowerCase();
      let isUser = await dbService.findOne(model.user,where);
      if (isUser) {
        let {
          resultOfEmail,resultOfSMS
        } = await authService.sendResetPasswordNotification(isUser);
        if (resultOfEmail && resultOfSMS){
          return res.requestValidated('otp successfully send.');
        } else if (resultOfEmail && !resultOfSMS) {
          return res.requestValidated('otp successfully send to your email.');
        } else if (!resultOfEmail && resultOfSMS) { 
          return res.requestValidated('otp successfully send to your mobile number.');
        } else {
          return res.failureResponse('otp can not be sent due to some issue try again later');
        }
      } else {
        return res.recordNotFound({});
      }
    } catch (error) {
      return res.failureResponse(error);
    }
  },
  /*
   * api : validate forgot password otp 
   * description : after successfully sent mail or sms for forgot password validate otp
   */
  validateResetPasswordOtp: async (req, res) => {
    const params = req.body;
    try {
      if (!params || !params.otp) {
        return res.insufficientParameters();
      }
      let isUser = await dbService.findOne(model.userAuthSettings, { resetPasswordCode: params.otp });
      if (!isUser || !isUser.resetPasswordCode) {
        return res.invalidRequest('Invalid OTP');
      }
      // link expire
      if (moment(new Date()).isAfter(moment(isUser.expiredTimeOfResetPasswordCode))) {
        return res.invalidRequest('Your reset password link is expired or invalid');
      }
      return res.requestValidated('Otp verified');
    } catch (error) {
      return res.failureResponse(error.message);
    }
  },
  /*
   * api : reset password
   * description : after successfully sent email or sms for forgot password,
   *                validate otp or link and reset password
   */
  resetPassword : async (req, res) => {
    const params = req.body;
    try {
      if (!params.code || !params.newPassword) {
        return res.insufficientParameters();
      }
      let userAuth = await dbService.findOne(model.userAuthSettings, { resetPasswordCode: params.code });
      if (userAuth && userAuth.expiredTimeOfResetPasswordCode) {
        if (moment(new Date()).isAfter(moment(userAuth.expiredTimeOfResetPasswordCode))) {// link expire
          return res.invalidRequest('Your reset password link is expired or invalid');
        }
      } else {
        // invalid code
        return res.invalidRequest('Invalid Code');
      }
      let response = await authService.resetPassword(userAuth.userId, params.newPassword);
      if (response && !response.flag){
        return res.requestValidated(response.data);
      }
      return res.invalidRequest(response.data);
    } catch (error) {
      return res.failureResponse(error.message);
    }
  },
  /*
   * api :  authentication
   * description : login user
   */
  login:async (req,res)=>{
    try {
      let {
        username,password
      } = req.body;
      let url = req.originalUrl;
      if (username && password){
        let result = await authService.loginUser(username,password,url); 
        if (!result.flag){
          return res.loginSuccess(result.data);
        }
        return res.loginFailed(result.data);
      } else {
        return res.insufficientParameters();
      }
    } catch (error) {
      return res.failureResponse(error.message);
    }
  },
  /*
   * api : logout
   * description : Logout User
   */
  logout: async (req, res) => {
    try {
      if (req.user) {
        let userTokens = await dbService.findOne(model.userToken, {
          token: (req.headers.authorization).replace('Bearer ', ''),
          userId:req.user.id 
        });
        userTokens.isTokenExpired = true;
        let id = userTokens.id;
        delete userTokens.id;
        await dbService.updateByPk(model.userToken,id, userTokens.toJSON());
        return res.requestValidated('Logged Out Successfully');
      }
      return res.badRequest({});
    } catch (error) {
      return res.failureResponse(error.message);
    }
  },

};
