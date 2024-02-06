const tableBody = document.querySelector("table tbody")
const divMensajeFinal = document.querySelector("div#mensajeFinal")
const botonEliminar = document.querySelector(".boton-eliminar")

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) || []
}

const carro = recuperarCarrito()

function armarFilaHTML(producto) {
    return `<tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td><button data-id="${producto.id}" class="boton-eliminar" title="Eliminar"" title="Pulsa para comprar"><img src="../assets/icons/basura.png" alt="Quitar producto"></button></td>
                </tr>`
}
function activarClickEnBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".boton-eliminar");

    for (let botonEliminar of botonesEliminar) {
        botonEliminar.addEventListener("click", () => {
            const idProducto = parseInt(botonEliminar.getAttribute("data-id"));
            eliminarProducto(idProducto);
        });
    }
}
function eliminarProducto(id){
    const indice = carro.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            carro.splice(indice, 1);
            localStorage.setItem("miCarrito", JSON.stringify(carro));
            actualizarTablaCarrito();
        }
}
function actualizarTablaCarrito() {
    tableBody.innerHTML = "";
    carro.forEach(producto => {
        tableBody.innerHTML += armarFilaHTML(producto);
    });

    const total = calcularTotalCarrito();

    tableBody.innerHTML += `<tr><td class="presupuestoTotal" colspan="2">TOTAL DE LA COMPRA</td><td></td>$<td>${total}</td></tr>`
}

function calcularTotalCarrito() {
    const shopping = new Compra(carro)
    return shopping.obtenerSubtotal()
}

if (carro) {
    tableBody.innerHTML = ""
    carro.forEach((producto)=> {
        tableBody.innerHTML += armarFilaHTML(producto)
    })
    activarClickEnBotonesEliminar()
    const total = calcularTotalCarrito()
    tableBody.innerHTML += `<tr><td class="presupuestoTotal" colspan="2">TOTAL DE LA COMPRA</td><td class="precioTotal" colspan="2">$${total}</td></tr>`
}
    const formularioCheckout = document.getElementById("formularioCheckout")

    formularioCheckout.addEventListener("submit", function(event) {
        const botonComprar = document.querySelector("#formularioCheckout button")
        botonComprar.disabled = true;
        const mensajeFinal = document.getElementById("mensajeFinal")
        mensajeFinal.classList.remove("disabled")
        mensajeFinal.style.display = "block"
        localStorage.removeItem("miCarrito")
    });

