
// class ExpressError extends Error {
//     constructor(statusCode, message) {
//         super();
//         this.statusCode = statusCode;
//         this.message = message
//     }
// }
// module.exports = ExpressError;

// or 

module.exports = class ExpressError extends Error {
    constructor (statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message  = message;
    }
}