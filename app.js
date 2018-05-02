var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressNunjucks = require('express-nunjucks');
const load = require('express-load');
var helmet = require('helmet');

var mongoose = require('mongoose')
mongoose.Promisse = require('bluebird');
mongoose.connect('mongodb://localhost/app-contatooh');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'njk');
const njk = expressNunjucks(app, {watch: true, noCache: true});


// descomente depois de colocar o seu favicon em / public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(bodyParser.urlencoded({ extended: true })); // extended: false, mudei para true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.disable('x-powered-by');

load('models', {cwd: './app_server'})
  .then('controllers')
  .then('routes')
  .into(app);

// pegar 404 e encaminhar para manipulador de erro
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//manipulador de erro
app.use(function(err, req, res, next) {
  // definir locais, apenas fornecendo erro no desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizar a página de erro
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
