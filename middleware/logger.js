const moment = require('moment');
//Middlewares have access to request and response object.
//The "next" parameter is for calling the next subsequent middleware.
//Middlwares are things that will be run before any other function in a server.
//Which means that anytime a request is made, the middlewares will be run.
const logger = (req, res, next) => 
{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;