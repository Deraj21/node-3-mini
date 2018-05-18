const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const session = require('express-session');
require('dotenv').config();
const createInitialSession = require('./middlewares/session');
const filter = require('./middlewares/filter');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
app.use( session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000
  }
}) );


// middleware
app.use( (req, res, next) => createInitialSession(req, res, next) );
app.use( (req, res, next) => { (req.method === 'POST' || req.method === 'PUT') ? filter(req, res, next) : next(); } );


// endpoints
app.post( "/api/messages", mc.create );
app.get( "/api/messages", mc.read );
app.get( "/api/messages/history", mc.history );
app.put( "/api/messages", mc.update );
app.delete( "/api/messages", mc.delete );

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );

/*

*/