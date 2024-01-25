/*const dotenv = require("dotenv");
dotenv.config({
    path: "../../.env"
});*/

//Modelos: logica detras de cada respuesta
const mariadb = require("mariadb")
const configuration = {
    host: "localhost",
    user: "root",
    password: "debo62", //process.env.PASSWORD
    database: "datalmf", //process.env.DATABASE
    connectionLimit: 5
    
};
const pool = mariadb.createPool(configuration) //conexion a la base de datos

 //MOdifica la base de datos
class MethodsCustomers {
    //obtener lista de clientes y sus datos como email, contraseña, empresa, nombre de referencia, celular, ubicacion y zona
    static async getCustomers() {
        try {
            const result  = await pool.query(`SELECT id, email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona FROM customers`);
            return result
        } catch (error) {
            return false;
         }   
    }
    //crear un nuevo cliente
    static async createCustomer(customer) {
       const { email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona } = customer;
        try {
            const result = await pool.query(
                `INSERT INTO customers(email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona) VALUE (?,?,?,?,?,?,?)`,
                [ email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona]
                );
                //obtener los datos del cliente creado y retornarlo en la solicitud
                const getid = await pool.query("SELECT max(id) as id FROM customers");
                const id = getid[0].id; //obtener el ultimo id
                return  id
                
        } catch (error) {
            return false;
          }    
    }
    //actualiza datos del cliente
    static async updateCustomer(id, customer) {
        const { email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona } = customer;
    try {
       const result = await pool.query(
            `UPDATE customers SET email=?, passwordUser=?, nameCompany=? , nameCustomer =?, tel =?, ubication=?, zona=? WHERE id =?`, [ email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona, id]
        );
        return customer
    } catch (error) {
         return false
     }    
    }
    //elimina a un cliente
    static async deleteCustomer(id) {
        try {
          const response = await pool.query(`DELETE FROM customers WHERE id=?`, [id]);
            return true;
            
        } catch (error) {
            return false;
        }
    }
};

module.exports = MethodsCustomers
