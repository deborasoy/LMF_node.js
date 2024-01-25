document.addEventListener("DOMContentLoaded",updateCustomer())
const id =  localStorage.getItem("id")
//form perfil
const formPefil = document.getElementById("formPefil");
//envio del formulario
function updateCustomer() {
    document.getElementById("btnPerfil").addEventListener("click", async (e) => {
        e.preventDefault();
        //input del formulario perfil
        const nameCompany = document.getElementById("nameCompany").value;
        const tel = document.getElementById("tel").value;
        const email = document.getElementById("email").value;
        const passwordUser = document.getElementById("passwordUser").value;
        const nameCustomer = document.getElementById("nameCustomer").value;
        const ubication = document.getElementById("ubication").value;
        const zona = document.getElementById("zona").value;
        //modificar que no se tenga que actualizar todo el perfil, sino lo que el usuario necesite y se mantenga la data anterior en la BD
        const updateCustomer = {
            "email": email,
            "passwordUser": passwordUser,
            "nameCompany": nameCompany,
            "nameCustomer": nameCustomer,
            "tel": tel,
            "ubication": ubication,
            "zona": zona
        };
        try {
            const data = await  putCustomers(updateCustomer);
            if (data && id) return alert("Actualizacion exitosa");
            alert("No estas registrado")
        } catch (error) {
            console.log("Error en la actualizacion", error.message);
        }  
        
    })
}
    
//fetch put: enviar actualizacion del  perfil del cliente a la base de datos
async function putCustomers(updateCustomer) {
    const urlOrders = `http://localhost:3000/customers/${id}`; 
    const requestOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateCustomer),
        redirect: 'follow',
    };

    const response = await fetch(urlOrders, requestOptions);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    return data
}