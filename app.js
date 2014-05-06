/*
 *                                                                  
 *                                                    88            
 *   ,d                                               88            
 *   88                                               88            
 * MM88MMM 8b,dPPYba,  ,adPPYba, 8b,dPPYba,   ,adPPYb,88 888888888  
 *   88    88P'   "Y8 a8P_____88 88P'   `"8a a8"    `Y88      a8P"  
 *   88    88         8PP""""""" 88       88 8b       88   ,d8P'    
 *   88,   88         "8b,   ,aa 88       88 "8a,   ,d88 ,d8"       
 *   "Y888 88          `"Ybbd8"' 88       88  `"8bbdP"Y8 888888888  
 * 
 */

var console     = require('console'),
    app         = require('./config/app');

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});