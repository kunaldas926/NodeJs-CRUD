const jwt = require('jsonwebtoken');
const adminSecret = require('../constants/authConstant').JWT.ADMIN_SECRET;
const deviceSecret = require('../constants/authConstant').JWT.DEVICE_SECRET;
const desktopSecret = require('../constants/authConstant').JWT.DESKTOP_SECRET;
const clientSecret = require('../constants/authConstant').JWT.CLIENT_SECRET;

/*
 * policy : only authentication policy for platform wise check, 
 *          whether user is authenticated or not
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    let url = req.originalUrl;
    let secret = '';
    if (url.includes('admin')){
      secret = adminSecret;
    }
    else if (url.includes('device')){
      secret = deviceSecret;
    }
    else if (url.includes('desktop')){
      secret = desktopSecret;
    }
    else if (url.includes('client')){
      secret = clientSecret;
    }
    jwt.verify(token,secret, (err, user) => {
      if (err) {
        return res.unAuthorizedRequest(err);
      }
      req.user = user;
      next();
    });
  } else {
    return res.unAuthorizedRequest({});
  }
};
module.exports = authenticateJWT;