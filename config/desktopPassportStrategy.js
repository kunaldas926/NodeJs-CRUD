/*
 * desktop authentication - with passport
 */

const {
  Strategy, ExtractJwt 
} = require('passport-jwt');
const { JWT } = require('../constants/authConstant');
const model = require('../model/index');
const dbService = require('../utils/dbService');

module.exports = {
  desktopPassportStrategy: passport => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = JWT.DESKTOP_SECRET;
    passport.use('desktop-rule',
      new Strategy(options, (payload, done) => {
        dbService.findOne(model.user,{ id: payload.id }).then((user)=>{
          if (user) {
            return done(null, { ...user.toJSON() });
          }
          return done('No User Found', {});
        }).catch(err => done(err, false));
      })
    );
  }
};