
document.addEventListener("DOMContentLoaded", createCustomer())
//registro y creacion del cliente
function createCustomer() {
    //formulario registro 
    const formRegis = document.getElementById("formRegister")
    document.getElementById("btnRegister").addEventListener("click", async (e) => {
        e.preventDefault();
        //input registro
        const companyName = document.getElementById("nameCompany").value;
        const tel = document.getElementById("tel").value;
        const email = document.getElementById("email").value;
        const passwordRegis = document.getElementById("passwordRegister").value;
        const passwordRepit = document.getElementById("repitPassword").value;
       //Faltan validaciones para los datos del registro
        const newCliente ={
       "email": email,
       "passwordUser": passwordRegis,
       "nameCompany": companyName,
       "nameCustomer": "pendiente",
       "tel": tel,
       "ubication": "pendiente",
       "zona": "pendiente"

    }
    try {
        const data = await  postCustomer(newCliente);
        if (data) {
            alert("Registro exitoso, bienvenido!");
            window.location.replace("http://localhost:3000/perfil.html");
        } else{
            alert("Intentelo de nuevo");
         }      
    } catch (error) {
        console.log("Hubo alguna complicacion", error.message);
    }      
 })   
};

//fetch post: enviar registro a la base de datos
async function postCustomer(newCliente) {
    const urlCustomers = `http://localhost:3000/customers`; 
    const requestOptions = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newCliente),
        redirect: 'follow',
    };
    const response = await fetch(urlCustomers, requestOptions);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    localStorage.setItem('id', data)
    return data;
}
