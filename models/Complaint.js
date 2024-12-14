const mongoose = require('mongoose')

const ComplaintSchema = new mongoose.Schema({
    enrollNumber:{
        type: String,
        required: true
    },
    roomNumber:{
        type: String,
        required: true
    },
    description:{
        type : String,
        required:true
    }
})

const complains = new mongoose.model("complains",ComplaintSchema);

module.exports = complains;