const { StatusCodes } = require("http-status-codes")
const { CustomAIPError } = require("../errors")

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAIPError){
        return res.status(err.statusCode).json({msg:err.message})
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({msg : err.message})
}

module.exports = errorHandlerMiddleware 