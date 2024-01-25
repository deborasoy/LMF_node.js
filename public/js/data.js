
const token = localStorage.getItem('token')

document.addEventListener("DOMContentLoaded",()=>{
    if(!token) window.location.replace("http://localhost:3000/loginAccess.html") // redirige sin autorizacion
    eventsMenu()
});
//fetch get: obtener data de clientes
async function getCustomer() {
    const urlCustomers = `http://localhost:3000/customers`; 
    const requestOptions = {
        method: 'GET',
        headers: {
            "access-token": token
        },
        redirect: 'follow'
    };
    const response = await fetch(urlCustomers, requestOptions);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    showCustomer(data);
}
//fetch get:  obtener data de pedidos
async function getOrder() {
    const token = localStorage.getItem('token')
    const ulrOrders = `http://localhost:3000/orders`;
    const requestOptions = {
        method: 'GET',
        headers: {
            "access-token": token
        },
        redirect: 'follow',
    };
    const response = await fetch(ulrOrders, requestOptions);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    showOrder(data);
};
 //fetch delete: eliminar pedido 
async function deleteOrders(id) {
    const urlOrders = `http://localhost:3000/orders/${id}`; 
    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    const response = await fetch(urlOrders, requestOptions);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json(); 
    alert("Pedido eliminado correctamente")

    window.location.replace("http://localhost:3000/data.html")

}

//template clientes
async function showCustomer(array) {
    const arrayParse = JSON.parse(array);
    document.getElementById("tBodyCustomers").innerHTML = ''; //limpiar los campos para que con cada click no se repita la tabla
    let template = ``;
    for (let i = 0; i < arrayParse.length; i++) {
        const cliente = arrayParse[i]
         const { email, passwordUser, nameCompany, nameCustomer, tel, ubication, zona } = cliente;
         template += `
                        <tr>
                            <td>${nameCustomer}</td>
                            <td>${nameCompany}</td>
                            <td>${zona}</td>
                            <td>${ubication}</td>
                            <td>${tel}</td>
                            <td>${email}</td>
                            <td>${passwordUser}</td>
                        </tr>
                    `;
    }
document.getElementById("tBodyCustomers").innerHTML += template; 
};
//template pedidos + funcionalidad delete al boton del template por cada pedido
async function showOrder(array) {
    const orderBD = JSON.parse(array);
    document.getElementById("tBodyOrder").innerHTML = ''; //limpiar los campos para que con cada click no se repita la tabla
    let template = ``;
    for (let i = 0; i < orderBD.length; i++) {
        const pedido = orderBD[i];
        const { id, dateOrder, orderTrade, nameCompany, zona } = pedido;
        template += `
                        <tr>
                            <td>${nameCompany}</td>
                            <td>${zona}</td>
                            <td>${dateOrder}</td>
                            <td>${orderTrade}</td>
                            <td><input onclick=deleteOrders(${id}); class="btn btn-dark" type="submit" value="Eliminar pedido" id="btnOrder"></td>
                        </tr>
                    `;
    }
    document.querySelector('#tBodyOrder').innerHTML += template;
}
//mostrar data segun la opcion seleccionada en el menu 
function eventsMenu() {
    const optionCustomer = document.getElementById('customer');
    const optionOrder = document.getElementById('order');
    const optionTotales = document.getElementById('totales');
    const divTotales = document.querySelector('#divTotales');
    const divCustomer = document.querySelector('#divCustomer');
    const divOrder = document.querySelector('#divOrder');
    //evento para opcion clientes
    optionCustomer.addEventListener('click', (e) => {
        divCustomer.classList.remove('d-none')
        divOrder.classList.add('d-none')
        divTotales.classList.add('d-none')
     
       getCustomer();
    })
    //evento para opcion pedidos
    optionOrder.addEventListener('click', (e) => {
        divCustomer.classList.add('d-none')
        divOrder.classList.remove('d-none')
        divTotales.classList.add('d-none')
     
       getOrder();
    })
    //evento para opcion totales, aun no esta desarrollado el contenido real
    optionTotales.addEventListener('click', (e) => {
        divCustomer.classList.add('d-none')
        divOrder.classList.add('d-none')
        divTotales.classList.remove('d-none')
        let templeate = `
        <div class="alert alert-info" role="alert" style="width:25rem">
        Funcionalidad en desarrollo, proximamente 
        </div>`;
        
        divTotales.innerHTML = templeate;
        
        
    })



    
};
