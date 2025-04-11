
const routes = require("express").Router()

const roleController = require('../controller/RoleController')


routes.get('/roles',roleController.getAllroles)
routes.post('/addrole',roleController.addrole)
routes.get('/oneRole/:id',roleController.fetchOneRole)
routes.delete('/deleteRole/:id',roleController.deleteRole)

module.exports=routes;