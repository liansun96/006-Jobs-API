const { StatusCodes } = require("http-status-codes")
const { CustomAIPError } = require("../errors")

const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR , 
        msg : err.message || 'Something Went Wrong Please Try Again Later'
    }

    if(err instanceof CustomAIPError){
        return res.status(err.statusCode).json({msg:err.message})
    }

    if(err.code && err.code === 11000 ){
        customError.msg = `Duplicate value enter for ${Object.keys(err.keyValue)} field , Please chose another value`
        customError.statusCode = 400
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
    return res.status(customError.statusCode).json({msg : customError.msg})
}

module.exports = errorHandlerMiddleware 