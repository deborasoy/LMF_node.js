//Controles: respuesta del servidor

const MethodsOrders = require("../models/orders")
//funcionen provinientes de los modelos
 class controllersOrders {
  //Obtiene la lista de pedidos y la retorna en caso de no haber fallos
   static async getOrders(req, res) {
     const result = await MethodsOrders.getOrders();
     if(result) return res.json(JSON.stringify(result));

       res.status(500).json({ message: "Se rompió el servidor" })
   }
   //Crea un nuevo pedido y retorna los datos del pedido en caso de no haber imprevistos
   static async createOrder(req, res) {
     const result = await MethodsOrders.createOrder(req.body)
     if (result) return res.json(JSON.stringify(req.body))
  
     res.status(500).json({ message: "Se rompió el servidor" });
   }
   //Actualiza los datos de un pedido existente por medio de identificarlo por su id y el cuerpo de la solicitud con la data
   //retorna el pedido con los datos actualizados en caso de no haber complicaciones 
    static async updateOrder(req, res) {
      const { id } = req.params;
      const result = await MethodsOrders.updateOrder(id, req.body)
      if (result) return res.json( JSON.stringify(req.body))
      
      res.status(500).json({ message: "Se rompió el servidor" });
      }
      //Elimina a un pedido por medio de su id y retorna un mensaje de confirmacion de la operacion, en caso de no haber errores
   static async deleteOrder(req, res) {
     const { id } = req.params;
     const result = await MethodsOrders.deleteOrder(id)
     if (result) return res.json({message:"dato eliminado con exito"});
     res.status(500).json({ message: "Se rompió el servidor" })
   }
};

module.exports = controllersOrders

/*realizar validaciones que van en los controladores:
formato y coherencia que tengan lo datos que hemos recibido, que se puedan procesar antes de enviarse al la BD*/
//input del usuario validar aca
//post y put validar con zod

