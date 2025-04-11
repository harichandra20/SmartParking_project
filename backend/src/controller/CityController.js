const cityModel = require('../models/CityModel')

const addCity = async(req,res) => {
    
    
    try {

        const savedCity= await cityModel.create(req.body) 

        res.status(201).json({
            message : "city added successdfully",
            data : savedCity
        })
         
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message : "internal server error " + error 
        })
    }
}

const getAllCity = async(req,res) => {
    
    
    try {

        const getCity= await cityModel.find() 

        res.status(201).json({
            message : "All citys fetched successfully",
            data : getCity
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message : "internal server error" + error 
        })
    }
}


const getCityByStateId = async (req, res) => {
    try {
      const cities = await cityModel.find({ stateId: req.params.stateId });
      res.status(200).json({
        message: "city found",
        data: cities,
      });
    } catch (err) {
      res.status(500).json({
        message: "city  not found",
      });
    }
  }
  
module.exports= {
    addCity,getAllCity,getCityByStateId
}