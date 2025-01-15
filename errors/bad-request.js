const { StatusCodes } = require("http-status-codes")
const CustomAIPError = require("./custom-error")

class BadRequestError extends CustomAIPError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError