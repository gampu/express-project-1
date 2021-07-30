/* Requires */
var http = require( "http" );
var fs = require( "fs" );
var path = require( "path" );
var express = require( "express" );
var morgan = require( "morgan" );
const app = express();

/* Set */
app.set( "views", path.resolve( __dirname, "views" ) );
app.set( "view_engine", "ejs" );

/* Logger */
app.use( morgan( "combined" ) );

/* Routing for "/" */
app.get( "/", function( req, res ){
    res.render( "index.ejs", { ip: req.connection.remoteAddress.substring( 7 ),
                               port: req.connection.remotePort } );
});

/* Serve static files */
app.use( express.static( path.join( __dirname, "static" ) ) );

/* Return 404 on error */
app.use( function( req, res ){
    res.status( 404 ).render( "404.ejs" );
});

/* Create server */
app.listen( process.env.PORT || 8000, function(){
    console.log( `Server is ready on port ${ process.env.PORT || 8000 }. Go!!!` );
});
