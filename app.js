const express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
	mongoose = require('mongoose'),
	cors = require('cors');

//Import models and middleware
require('./models/Station');
require('./models/Trip');

const isProduction = process.env.NODE_ENV === 'production';

//Create and configure express app
const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'hubway', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if(!isProduction){
	app.use(errorHandler());
}

//Mongodb connection
if(isProduction){
	mongoose.connect(process.env.MONGODB_URI);
}else{
	mongoose.connect('mongodb://localhost/hubway');
	mongoose.set('debug',true);
}

//Routes
app.use(require('./routes'));

//Error handling
//Catch 404 errors and forward to error handler
app.use(function(req,res,next){
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

//Development error handler
if(!isProduction){
	app.use(function(err,req,res,next){
		console.log(err.stack);

		res.status(err.status || 500);

		res.json({ errors:{
			message:err.message,
			error:err
		}});
	});
}

app.use(function(err,req,res,next){
	res.status(err.status || 500);

	res.json({errors:{
		message:err.message,
		error:{}
	}});
});

//Boot up server
const server = app.listen(process.env.PORT || 3000, function(){
	console.log(`Listening on port:${server.address().port}`);
});