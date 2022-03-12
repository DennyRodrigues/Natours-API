const fs = require('fs');

// Create Path variable
const pathToursSimple = `${__dirname}/../dev-data/data/tours-simple.json`;
// Read file tours
const tours = JSON.parse(
  fs.readFileSync(pathToursSimple)
);  



// tours check functions
exports.checkID = (req, res, next, val) => {
  if (Number(req.params.id) > tours.length){
    return (res.status(404).json({
      status: 'failed',
      message: 'tour id not found'
    }))
  }
  next();

}
exports.checkBody = (req, res, next) => {
  if ( !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('price')){ 
    return (res.status(400).json({
      status: 'fail',
      message: 'request body needs name and price properties'
    }))
  }
  next()


}
// tours api functions
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
}

exports.addTour = (req, res) => {

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id:newId}, req.body);

  tours.push(newTour);

  fs.writeFile(pathToursSimple, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      results: tours.length,
      data:{
        tours: tours
      }
      
    })
  })
}

exports.getTour = (req, res) => {

  const id = Number(req.params.id);

  const tour = tours.find(tour => tour.id === id)

    res.status(200).json({
      status: 'success',
      data:{
        tour: tour
      }
    })

 }

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tourUpdate = req.body;

  let foundIndex = tours.findIndex(tour => tour.id === id)

  if (foundIndex > -1) {
    
    tours[foundIndex] = Object.assign({}, tours[foundIndex], tourUpdate);

    fs.writeFile(pathToursSimple, JSON.stringify(tours), (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: tours[foundIndex]

        }
      })
      
    })

  }
  else{
    res.status(404).json({
      status: 'fail',
      message: 'tour id not found'
    })

  }






}

exports.deleteTour = (req, res) => {

  const id = Number(req.params.id);
  const tourUpdate = req.body;

  let foundIndex = tours.findIndex(tour => tour.id === id)

    tours.splice(foundIndex, 1);

    fs.writeFile(pathToursSimple, JSON.stringify(tours), (err) => {
      res.status(204).json({
        status: 'sucess',
        data: null
      })

    })

  }