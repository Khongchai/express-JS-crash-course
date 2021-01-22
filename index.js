const express = require("express");
const path = require('path');
const logger = require("./middleware/logger");

const app = express();

//Init middleware
app.use(logger);
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 

/* 
app.get('/', function(req, res)
{
    //send file that is in currentdirectory/public/index.html to frontend
    //but doing this is better and more elegantly achieved using a static folder
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 */

 
//set static folder
//Anything in the "public" folder will now be accessible from client side.
//Basically, any static file in the directory will be served, be it js, css, or html.
//This only applies to serving static files. For API, see other notes.
app.use(express.static(path.join(__dirname, 'public')));

//API routes
app.use('/api/objects', require('./routes/api/objects'));

//Check first if this port is available in the environment variable, if not, default to 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

