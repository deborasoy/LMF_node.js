
//Modelos: logica detras de cada respuesta
const mariadb = require("mariadb");

const configuration = {
    host: "localhost",
    user: "root",
    password: "debo62",
    database: "datalmf",  
};

const pool = mariadb.createPool(configuration) //conexion a la base de datos
//modifica en la base de datos
class MethodsOrders {
    static async getOrders() {
        //obtiene los datos de cada pedido, como su id, fecha, zona, empresa y el total pedido
        try {
            const result  = await pool.query(`SELECT id, dateOrder, zona, nameCompany, orderTrade FROM orders`);
            return result
        } catch (error) {
            return false;
         }   
    }
    //crea un nuevo pedido con su datos correspondientes como, fecha, zona, empresa, total pedido
    static async createOrder(order) {
        const { dateOrder, zona, nameCompany, orderTrade } = order;
        try {
            const result = await pool.query(
                `INSERT INTO orders(dateOrder, zona, nameCompany, orderTrade) VALUE (?,?,?,?)`,
                [dateOrder, zona, nameCompany, orderTrade]
            );
            return order
        } catch (error) {
            return false;
          }    
    }
    //actualiza el pedido ya ingresado
    static async updateOrder(id, order) {
        const { dateOrder, zona, nameCompany, orderTrade} = order;
    try {
       const result = await pool.query(
            `UPDATE orders SET dateOrder=?, zona=?, nameCompany=? , orderTrade =? WHERE id =?`, [dateOrder, zona, nameCompany, orderTrade, id]
        );
        return order
    } catch (error) {
         return false
     }    
    }
    //elimina un pedido por su id
    static async deleteOrder(id) {
        try {
          const response = await pool.query(`DELETE FROM orders WHERE id=?`, [id]);
            return true;
            
        } catch (error) {
            return false;
        }
    }
};

module.exports = MethodsOrders

