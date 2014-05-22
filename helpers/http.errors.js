module.exports = {
    BadRequest: function(msg, code) {
        if (code !== undefined && code !== null) {
            this.code = code;
        }
        this.status = 400;
        this.message = msg || 'Bad request';
    },
    Unauthorized: function(msg, code) {
        if (code !== undefined && code !== null) {
            this.code = code;
        }
        this.status = 401;
        this.message = msg || 'Unauthorized';
    },
    Forbidden: function(msg, code) {
        if (code !== undefined && code !== null) {
            this.code = code;
        }
        this.status = 403;
        this.message = msg || 'Forbidden';
    },
    NotFound: function(msg, code) {
        if (code !== undefined && code !== null) {
            this.code = code;
        }
        this.status = 404;
        this.message = msg || 'Not found';
    }
};