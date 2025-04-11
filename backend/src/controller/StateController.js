const stateModel = require('../models/StateModel')

const addState = async(req,res) => {
    
    
    try {

        const savedState= await stateModel.create(req.body) 

        res.status(201).json({
            message : "state added successdfully",
            data : savedState
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message : "internal server error" + error 
        })
    }
}

const getAllstate = async(req,res) => {
    
    
    try {

        const getState= await stateModel.find() 

        res.status(201).json({
            message : "All states fetched successfully",
            data : getState
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message : "internal server error" + error 
        })
    }
}
module.exports = {
    addState,getAllstate
}