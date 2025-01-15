const {Router} = require('express');
const upload = require('../util/upload');
const inventoryModel = require('../models/inventory.model');
const authenticateUser = require('../middleware/auth');

const inventoryRouter = Router();

inventoryRouter.post("/inventory", authenticateUser, async(req, res)=> {
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


// API to get all cars from the dealer's inventory
inventoryRouter.get('/inventory', async (req, res) => {
    const { dealerId } = req.query;
    try {
      const inventory = await inventoryModel.find({ dealerId });
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // API to edit car details
inventoryRouter.put('/inventory/:id', upload.single('image'), async (req, res) => {
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
    } = req.body;
  
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
  
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
  
    try {
      const updatedCar = await inventoryModel.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedCar);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // API to delete car details
  inventoryRouter.delete('/inventory/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await inventoryModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'Car deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

module.exports=inventoryRouter