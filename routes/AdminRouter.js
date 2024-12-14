const express = require('express')
const router = express.Router()
const complains = require('../models/Complaint')
const ensureAuthenticated = require("../Middlewares/Auth")

//complains at admin panel
router.get('/getComplains',ensureAuthenticated,async (req,res) =>{
    try{
        const complaintData = await complains.find();
        res.status(201).json(complaintData);
    }catch(error){
        res.status(404).json(error);
    }
})

//deleteComplains
router.delete('/resolved/:id',ensureAuthenticated,async (req,res) => {
    try{
        const {id} = req.params;

        const deleteComplaint = await complains.findByIdAndDelete({_id: id});
        res.status(201).json({success:true,deleteComplaint});

    }catch(error){
        res.status(404).json(error);
    }
})


module.exports = router

