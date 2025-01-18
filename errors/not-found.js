const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("./custom-error");

class notFoundError extends CustomAIPError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = notFoundError