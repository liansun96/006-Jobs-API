const { StatusCodes } = require("http-status-codes")
const CustomAIPError = require("./custom-error")

class UnauthenticatedError extends CustomAIPError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError