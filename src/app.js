const secretKey='clave1234';
//inicializaciones
const express = require('express');
const customerRouter = require('./routes/customers');
const orderRouter = require('./routes/orders');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express()
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

//Token para get autorizacion para el dueño
app.post("/loginData", (req, res) => {
  const { username, password } = req.body;
  if (username === "leoempresa" && password === "emanuel20") {
    const token = jwt.sign(username, secretKey); //process.env.SECRETKEY
    res.status(200).json({"token": token});
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});
//MIDDLEWARE
const validation = (req, res, next) => {
    try {
      const autorizacion = req.headers["access-token"];
       const decoded = jwt.verify(autorizacion, secretKey );
        next();
    } catch (err) {
        res.status(401).json({ message: "Usuario no autorizado" });
    }
};

//Rutas
app.get("/customers", validation, customerRouter); // el metodo get lo tiene permitido solamente la empresa
app.get("/orders", validation, orderRouter); // el metodo get lo tiene permitido solamente la empresa
app.use("/customers", customerRouter); 
app.use("/orders", orderRouter); 
//Configuraciones
const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory)); //visualizar e interactuar con el contenido de la carpeta public. 

//dotenv.config({ path: '../.env' });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

});




