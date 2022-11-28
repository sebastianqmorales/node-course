const e = require('express');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// The express.json middleware allows us to get a request body that is in json
app.use(express.json());

// "Database" connection, the connection to a json file in the app
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// These are called route handlers
// Get Requests
app.get('/api/v1/tours', (req, res) => {
  res.json({
    staus: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
// Getting by id
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  //   Converting id to a number instead of a string & looping through the tours array of objects
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    staus: 'success',
    data: {
      tour,
    },
  });
});

// Post requests
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
