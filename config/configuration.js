/**
 * Application configuration object
 *
 * @constructor
 */
function Configuration() {
    
    this.env        = process.env.NODE_ENV || 'dev';
    this.port       = process.env.PORT || 5000;
    this.host       = process.env.TRENDZ_HOST || "localhost";
    this.mongodb    = process.env.TRENDZ_MONGODB_PATH || 'mongodb://localhost/trendz';
}

/**
 * Get root URL of application
 */
Configuration.prototype.getRootUrl = function() {
    
    var url = 'http://' + this.host;
    url += (80 !== this.port) ? ':' + this.port : '';
    return url;
};

module.exports = new Configuration();