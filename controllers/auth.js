const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require("../errors")

const register = async(req, res) => { 

    const user = await User.create({...req.body})     
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user : {name : user.name} , token}) 
}

const login = async(req, res) => {
    const {email , password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please Provided email & password')
    }

    const user = await User.findOne({email})
    // console.log(user);

    if(!user){
        throw new UnauthenticatedError('Invilid Email , Please Provide Valid Email!')
    }

    const isPasswordCorret = await user.comparePassword(password)
    if(!isPasswordCorret){
        throw new UnauthenticatedError('Invilid Password , Please Provide valid Password')
    }

    const token = user.createJWT()   
    res.status(StatusCodes.OK).json({user : {name : user.name} , token})
}

module.exports = {register , login}