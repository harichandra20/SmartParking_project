const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const areaSchema = new Schema({
    name : {
        type:String,
        require:true,
        unique:true
    },
    cityId :{
        type:Schema.Types.ObjectId,
        ref:"city"
    },
    stateId :{
        type:Schema.Types.ObjectId,
        ref:"state"
    },
    pincode : {
        type:String,
        require:true,
        unique:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("area",areaSchema)