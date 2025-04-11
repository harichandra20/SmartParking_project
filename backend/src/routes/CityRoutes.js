const routes = require('express').Router();
const cityController = require('../controller/CityController')

routes.post("/addcity",cityController.addCity)
routes.get("/getcity",cityController.getAllCity)
routes.get("/getcitybystate/:stateId",cityController.getCityByStateId)

module.exports = routes; 