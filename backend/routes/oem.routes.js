const {Router} = require('express');
const oemModel = require('../models/oems.model');
const oemRouter=Router()

// API to get the number of OEM models
oemRouter.get('/oem/models', async (req, res) => {
    try {
      const count = await oemModel.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // API to search for a specific OEM model by name and year
oemRouter.get('/oem/model/:modelName/:year', async (req, res) => {
    const { modelName, year } = req.params;
    try {
      const oem = await oemModel.findOne({ modelName, year });
      if (!oem) return res.status(404).json({ message: 'OEM model not found' });
  
      res.status(200).json(oem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


  module.exports=oemRouter
  