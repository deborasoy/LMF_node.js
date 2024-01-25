
document.addEventListener("DOMContentLoaded", createOrder())

//envio del formulario 
function createOrder() {
    //form realizar pedido
    const formOrders = document.getElementById("formOrders");
    document.getElementById("btnPedido").addEventListener("click", async (e) => {
        e.preventDefault();
        //input realizar pedido
        const nameCompany = document.getElementById("nameCompany").value;
        const dateOrder = document.getElementById("dateOrder").value;
        const orderTrade = document.getElementById("orderTrade").value;
        const zona = document.getElementById("zona").value;
        const  order ={
        "dateOrder": dateOrder,
        "zona": zona,
        "nameCompany": nameCompany,
        "orderTrade": orderTrade,
    }
    try {
        const data = await postOrder(order);
        if (data) return alert("pedido enviado con exito");
        alert("Algo salio mal, intentalo de nuevo");
    } catch (error) {
        console.log("Error al realizar el pedido", error.message);
    }  

 })
};
//fetch post: enviar pedido a la base de datos
async function postOrder(order) {
    const urlOrders = `http://localhost:3000/orders`; 
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
        redirect: 'follow'
    };

    const response = await fetch(urlOrders, requestOptions);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    return data
}