const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path:'.env' });
global.__basedir = __dirname;
const ejs = require('ejs');
const listEndpoints = require('express-list-endpoints');
const passport = require('passport');

const models = require('./model');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const seeder = require('./seeders');

const { adminPassportStrategy } = require('./config/adminPassportStrategy');
const { devicePassportStrategy } = require('./config/devicePassportStrategy');
const { desktopPassportStrategy } = require('./config/desktopPassportStrategy');
const { clientPassportStrategy } = require('./config/clientPassportStrategy');

const app = express();
app.use(require('./utils/responseHandler'));

models.sequelize.sync({}).then(()=>{
  //all routes 
  const routes =  require('./routes');
  app.use(routes);
  const allRegisterRoutes = listEndpoints(app);
  seeder(allRegisterRoutes).then(()=>{console.log('Seeding done.');});
});

const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));

//template engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
adminPassportStrategy(passport);
devicePassportStrategy(passport);
desktopPassportStrategy(passport);
clientPassportStrategy(passport);

app.listen(process.env.PORT,()=>{
  console.log(`your application is running on ${process.env.PORT}`);
});
