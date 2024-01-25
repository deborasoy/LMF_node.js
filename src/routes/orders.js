//Rutas: segun la peticion que se realiza
const express = require("express")
const orderRouter = express.Router() //quien escucha segun el metodo la accion que realiza

const controllersOrders= require('../controllers/orders');
//rutas por cada metodo
//funciones provinientes de controles 

orderRouter.get('/', controllersOrders.getOrders);
orderRouter.post('/', controllersOrders.createOrder);
orderRouter.put('/:id', controllersOrders.updateOrder);
orderRouter.delete('/:id', controllersOrders.deleteOrder);

module.exports = orderRouter

