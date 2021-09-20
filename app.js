const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const getFullUrl = (req) =>
  `${req.protocol}://${req.headers.host}${req.originalUrl}`;

app.use(function (req, res, next) {
  req.getUrl = getFullUrl(req);
  return next();
});
const courses = [
  { id: 1, name: 'Algorithms' },
  { id: 2, name: 'Software Engineering' },
  { id: 3, name: 'Human Computer Interaction' },
];

app.get('*', (req, res) => {
  res.send(req.headers);
});

app.get('/', function (req, res) {
  res.send({ hi: 'hi' });
});
//when we route to /courses
app.get('/courses', function (req, res) {
  res.send(courses); //respond with the array of courses
});
//To get a specific course, we need to define a parameter id
app.get('/courses/:id', function (req, res) {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //if the course does not exist return status 404 (not found)
  if (!course)
    return res.status(404).send('The course with the given id was not found');
  //return the object
  res.send(course);
});
//using the http post request we can create a new course
app.post('/courses', function (req, res) {
  //create a course object
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  //add the course to the array
  courses.push(course);
  //return the course
  res.send(course);
});
app.put('/courses/:id', function (req, res) {
  //get the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given id was not found');
  //update the course
  course.name = req.body.name;
  //return the updated object
  res.send(course);
});
app.put('/courses/:id', function (req, res) {
  //get the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The course with the given id was not found');
  //update the course
  course.name = req.body.name;
  //returns the updated object
  res.send(course);
});

app.get('*', (req, res) => {
  res.send(req.headers);
});

module.exports = app;
