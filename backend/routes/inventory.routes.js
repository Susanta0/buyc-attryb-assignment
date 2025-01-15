const {Router} = require('express');
const upload = require('../util/upload');
const inventoryModel = require('../models/inventory.model');
const userValidation = require('../middleware/auth');


const inventoryRouter = Router();

inventoryRouter.post("/inventory",userValidation , async(req, res)=> {
    const { modelName, year, price, kmOdometer, majorScratches, originalPaint, numAccidents, numPreviousBuyers, registrationPlace, description, color, imageUrl} = req.body;
    if (!imageUrl || !modelName || !year || !price || !color) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
      try {
        const newCar = new inventoryModel({
          dealerId: req.user.id, // Use the authenticated user's ID
          modelName,
          year,
          price,
          kmOdometer,
          majorScratches,
          originalPaint,
          numAccidents,
          numPreviousBuyers,
          registrationPlace,
          description,
          color,
          imageUrl
          });
          const savedCar = await newCar.save();
          res.status(201).json({ message: 'Car added successfully!', car: savedCar });
      
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    
})


inventoryRouter.get('/inventory', userValidation, async (req, res) => {
  try {
      
      const dealerId = req.user._id; 
      const inventory = await inventoryModel.find({ dealerId });

      if (inventory.length === 0) {
        return res.status(404).json({ message: 'No inventory found for this dealer.' });
      }

      res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  // API to edit car details
  inventoryRouter.put('/inventory/:id', userValidation, async (req, res) => {
    const { id } = req.params;
    const {
      modelName,
      year,
      price,
      kmOdometer,
      majorScratches,
      originalPaint,
      numAccidents,
      numPreviousBuyers,
      registrationPlace,
      description,
      color,
      imageUrl,
    } = req.body;

    const car = await inventoryModel.findById(id);
  
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
  
    if (car.dealerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this car.' });
    }
  
    const updateData = {
      modelName,
      year,
      price,
      kmOdometer,
      majorScratches,
      originalPaint,
      numAccidents,
      numPreviousBuyers,
      registrationPlace,
      description,
      color,
    };
  
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }
  
    try {
      const updatedCar = await inventoryModel.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json({ message: 'Car updated successfully', updatedCar });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
//   // API to delete car details

inventoryRouter.delete('/inventory/:id', userValidation, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the car by ID to ensure it's part of the current user's inventory
    const car = await inventoryModel.findById(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Ensure the logged-in user is the dealer for this car
    if (car.dealerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this car.' });
    }

    await inventoryModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Car deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  

module.exports=inventoryRouter