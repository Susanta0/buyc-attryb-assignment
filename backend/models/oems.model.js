const {Schema, model}=require("mongoose")

const oemSchema = new Schema({
    modelName: { type: String, required: true },
    year: { type: Number, required: true },
    listPrice: { type: Number, required: true },
    availableColors: [String], 
    mileage: { type: Number, required: true },
    powerBHP: { type: Number, required: true }, 
    maxSpeed: { type: Number, required: true },
  });

  const oemModel= model("OEM", oemSchema)

  module.exports=oemModel
  