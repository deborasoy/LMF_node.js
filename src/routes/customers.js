//Rutas: segun la peticion que se realiza
const express = require("express");
const customerRouter = express.Router(); //quien escucha segun el metodo la accion que realiza 
const ControllersCustomers = require('../controllers/customers');



//rutas por cada metodo
//funciones provinientes de controles 
customerRouter.get('/',ControllersCustomers.getCustomers);
customerRouter.post('/', ControllersCustomers.createCustomer);
customerRouter.put('/:id', ControllersCustomers.updateCustomer);
customerRouter.delete('/:id', ControllersCustomers.deleteCustomer);



module.exports = customerRouter



