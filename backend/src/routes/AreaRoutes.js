const routes = require('express').Router();
const areaController = require('../controller/AreaController')

routes.post("/addarea",areaController.addArea)
routes.get("/getarea",areaController.getAllarea)
routes.get("/getareabycity/:cityId",areaController.getAreaBycityId)

module.exports = routes;