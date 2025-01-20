const { StatusCodes } = require("http-status-codes")
const Job = require("../models/Job")
const { CustomAIPError } = require("../errors")
const notFoundError = require("../errors/not-found")

const getAllJobs = async(req, res) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({nbHits : jobs.length , jobs})
}

const getJob = async(req, res) => {
    const {user : {userId} , params : {id : jobId}} = req

    const job = await Job.findOne({_id : jobId , createdBy : userId})    
    if(!job){
        throw new notFoundError(`No job with id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const createJob= async(req, res) => {    
    req.body.createdBy = req.user.userId
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async(req, res) => {
    const {body : {company , position } , params : {id : jobId}} = req

    const job = await Job.findByIdAndUpdate({_id : jobId } , req.body , {new : true})
    if(!job){
        throw new notFoundError(`No job with id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async(req, res) => {
   const {user : {userId} , params : {id : jobId}} = req

   const job = await Job.findByIdAndDelete({_id : jobId , createdBy : userId})
   if(!job){
    throw new notFoundError(`No job with id : ${jobId}`)
   }

   res.status(StatusCodes.OK).json({job})
}

module.exports = {getAllJobs , createJob , getJob , updateJob , deleteJob}