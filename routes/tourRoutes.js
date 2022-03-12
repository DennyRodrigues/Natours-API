const express = require('express');
const { route } = require('express/lib/router');
const tourController = require('./../controllers/tourController.js');

const router = express.Router();

router.param('id', tourController.checkID)



router.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.addTour)

router.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)


module.exports = router;