document.addEventListener("DOMContentLoaded", loginAccessEmpresa());
//fetch para solicitar el token
async function getAccess(username, password) {
    const url = "http://localhost:3000/loginData" 
    const requestOptions = {
        method: "POST",
        headers: {
            "content-Type":"application/json" 
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
        redirect: "follow"
    }
    const response = await fetch(url, requestOptions);
    if(!response.ok) throw new Error ("error al iniciar sesion");
    const data = await response.json();
    const {token} = data;

    return token
};
//autorizacion para obtener el token verificando el usuario
function loginAccessEmpresa(){
    //formulario login
    const formLogin = document.getElementById("formLogin");
    document.getElementById("btnLogin").addEventListener("click",async (e) => {
        e.preventDefault();
        //login input
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        try {
            const token = await getAccess(username, password);
            if (token) {
                alert("Inicio de sesión correcto");
                localStorage.setItem('token', token) //guardo el token en el localStorage
                window.location.replace("http://localhost:3000/data.html"); //se permite el ingreso a data 
            } 
        } catch (error) {
            console.log("Error al iniciar sesión:", error.message);
            alert("Acceso denegado");
        }
    })
};



