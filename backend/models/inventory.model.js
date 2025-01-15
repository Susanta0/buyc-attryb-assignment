const {Schema, model}=require("mongoose")

const inventorySchema = new Schema({
    dealerId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the Dealer schema
    modelName: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    kmOdometer: { type: Number, required: true },
    majorScratches: { type: Boolean, required: true },
    originalPaint: { type: Boolean, required: true },
    numAccidents: { type: Number, required: true },
    numPreviousBuyers: { type: Number, required: true },
    registrationPlace: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: [String], // Array of bullet points describing the car
    color: { type: String, required: true }, // Color of the second-hand car
  });
  

  const inventoryModel= model("inventory", inventorySchema)

  module.exports=inventoryModel