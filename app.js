var http           = require('http'),
    express        = require('express'),
    app            = express(),
    path           = require('path'),
    favicon        = require('serve-favicon'),
    logger         = require('morgan'),
    methodOverride = require('method-override'),
    session        = require('express-session'),
    bodyParser     = require('body-parser'),
    compression    = require('compression'),
    multer         = require('multer');
    
// configuration
app.set('port', process.env.PORT || 3012);
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'b90djDJ23kf' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false /*true*/ }));
app.use(multer());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res, next){
    req.header('X-XSS-Protection' ,  '1; mode=block');
    next(); 
});

app.get('/SalesData', function(req, res, next){
    var limit = req.query.limit;   
    res.json(require('./private/salesData.js')(limit));
});

var server  = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});