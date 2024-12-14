const express = require("express")
const router  = express.Router()
const complains = require("../models/Complaint")
const ensureAuthenticated = require("../Middlewares/Auth")
//add Complaints
router.post("/addComplaint", ensureAuthenticated, async (req,res) =>{
    try{
        
        const {enrollNumber,roomNumber,description} = req.body;
        
        const addComplaint = new complains({enrollNumber,roomNumber,description});
        
        await addComplaint.save();
        
        res.status(201).json({
            success: true,
            message: "Complaint Registered"
        });

    }catch(error){
        res.status(422).json(error);
    }
})

module.exports = router