//Controles: respuesta del servidor

const MethodsCustomers = require("../models/customers")
//funciones provinientes de los modelos
 class ControllersCustomers {
  //Retorna la lista de clientes que se pidio a la base de datos en caso de no haber ninguna complicacion
   static async getCustomers(req, res) {
     const result = await MethodsCustomers.getCustomers();
     if(result) return res.json(JSON.stringify(result));

       res.status(500).json({ message: "Se rompió el servidor" })
   }
   //Crea un nuevo cliente por medio del cuerpo de la solicitud y retorna los datos del nuevo cliente en caso de no haber fallas
   static async createCustomer(req, res) {
     const result = await MethodsCustomers.createCustomer(req.body)
     if (result) return res.json( JSON.stringify(result))
  
     res.status(500).json({ message: "Se rompió el servidor" });
   }
   //Actualiza datos de un cliente existente por medio del cuerpo de la solicitud y el id para identificar el cliente, en caso de no haber errores
   //retorna el cliente con los datos actualizados
    static async updateCustomer(req, res) {
      const { id } = req.params;
      const result = await MethodsCustomers.updateCustomer(id, req.body)
      if (result) return res.json( JSON.stringify(req.body))
      
      res.status(500).json({ message: "Se rompió el servidor" });
      }
      //Elimina todos los datos de un cliente, al cliente por medio de identificarlo por su id
      //retorna un mensaje de confirmacion en caso de no haber imprevistos
   static async deleteCustomer(req, res) {
     const { id } = req.params;
     const result = await MethodsCustomers.deleteCustomer(id)
     if (result) return res.json({message:"dato eliminado con exito"});
     res.status(500).json({ message: "Se rompió el servidor" })
   }
};

module.exports = ControllersCustomers

/*realizar validaciones que van en los controladores:
formato y coherencia que tengan lo datos que hemos recibido, que se puedan procesar antes de enviarse al la BD*/
//input del usuario validar aca
//post y put validar con zod


