const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {
        type : String,
        require : [true , 'Please Provide Company Name'],
        maxLength : 50
    },
    position : {
        type : String,
        require : [true , 'Please Porvide Position'],
        maxLength : 100
    },
    status : {
        type : String,
        enum : ['interview' , 'declined' , 'pending'],
        default : 'pending'
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        red : 'User',
        require : [true , 'Please Provide User']
    }
},{timestamps : ture})

module.exports = mongoose.model('Job' , JobSchema)