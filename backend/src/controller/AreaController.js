const areaModel = require('../models/AreaModel')

const addArea = async(req,res) => {
    
    
    try {

        const savedArea= await areaModel.create(req.body) 

        res.status(201).json({
            message : "Area added successdfully",
            data : savedArea
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message : "internal server error" + error 
        })
    }
}

const getAllarea = async(req,res) => {
    
    
    try {

        const getArea= await areaModel.find() 

        res.status(201).json({
            message : "All citys fetched successfully",
            data : getArea
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message : "internal server error" + error 
        })
    }
}

const getAreaBycityId = async (req, res) => {
    try {
      const areas = await areaModel.find({ cityId: req.params.cityId });
      res.status(200).json({
        message: "area found",
        data: areas,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  };
module.exports= {
    addArea,getAllarea,getAreaBycityId
}