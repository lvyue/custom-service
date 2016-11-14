const [http, express, path, _] = [require('http'), require('express'), require('path'), require('lodash')];
// parser
const [cookieParser, bodyParser] = [require('cookie-parser'), require('body-parser')];
// cookie & session
const session = require('express-session');

const config = require('./config');
const chat = require('./chat');

const index = require('./routes/index');
const users = require('./routes/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  app.use(require('morgan')('dev'));
app.use(bodyParser.json({
  limit: "20mb"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.secret, config.cookie));

app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'bower_components')));

let sess = _.clone(config.session);
[sess.secret, sess.cookie, sess.store] = [config.secret, config.cookie, new (require('connect-redis')(session))(config.redis)];
app.use(session(sess));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');  
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log('origin url==>',req.url );
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = normalizePort(config.port || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// io
const io = require('socket.io')(server);
chat.bind(io.of('/cs'));
//
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port))// named pipe
    return val;
  if (port >= 0) // port number
    return port;
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen')
    throw error;

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

