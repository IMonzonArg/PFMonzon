// Function del DOM
document.addEventListener("DOMContentLoaded", function () {
    const seleccionBares = document.getElementById("seleccionBar");
    const cartaOnlineBares = document.getElementById("menuBares");
    const cuentaDom = document.getElementById("cuentaDom");
    let cuentaComanda = 0;

    // Eleccion de los bares
    seleccionBares.addEventListener("change", async () => {
        const barSeleccionado = seleccionBares.value;
        cartaOnlineBares.innerHTML = "";

        const respuesta = await fetch("data.json");
        const seleccion = await respuesta.json();
        console.log(seleccion);

        let barElegido;

        if (barSeleccionado === "cartaBar1") {
            barElegido = seleccion.cartaBar1;
        } else if (barSeleccionado === "cartaBar2") {
            barElegido = seleccion.cartaBar2;
        } else if (barSeleccionado === "cartaBar3") {
            barElegido = seleccion.cartaBar3;
        }

        if (barElegido) {
            mostrarCarta(barElegido);
        }
    });

    // Función para mostrar la información del bar seleccionado
    function mostrarCarta(barElegido) {
        const contenedorPrincipal = document.createElement("div");
        contenedorPrincipal.classList.add("contenedor-categorias");
        cartaOnlineBares.appendChild(contenedorPrincipal);

        barElegido.forEach((categoria) => {
            const contenedorCategoria = document.createElement("div");
            contenedorCategoria.classList.add("categoria");

            const infoCategoria = document.createElement("h2");
            infoCategoria.textContent = categoria.categoria;
            contenedorCategoria.appendChild(infoCategoria);

            categoria.productos.forEach((producto, index) => {
                const productoElement = document.createElement("p");
                productoElement.textContent = `${index + 1}. ${producto.nombre} $${producto.precio}`;

                const sumarButton = crearBoton("+", () => {
                    cuentaComanda += producto.precio;
                    const pedidoProducto = `${categoria.categoria} elegido: ${producto.nombre} | Total parcial: $${cuentaComanda}`;
                    cuentaDom.value += pedidoProducto + "\n";
                });

                const restarButton = crearBoton("-", () => {
                    cuentaComanda -= producto.precio;
                    const pedidoProducto = `${categoria.categoria} eliminado: ${producto.nombre} | Total parcial: $${cuentaComanda}`;
                    cuentaDom.value += pedidoProducto + "\n";
                });

                productoElement.appendChild(sumarButton);
                productoElement.appendChild(restarButton);
                contenedorCategoria.appendChild(productoElement);
            });

            contenedorPrincipal.appendChild(contenedorCategoria);
        });
    }

    // Función para la creación de los botones
    function crearBoton(texto, onClick) {
        const boton = document.createElement("button");
        boton.textContent = texto;
        boton.addEventListener("click", onClick);
        return boton;
    }
});

// Función para el guardado
const botonGuardado = document.getElementById('botonGuardado');
botonGuardado.addEventListener('click', function () {
    /* ---------------------------------------------------- Estructura JSON nombre y apellido ---------------------------------------------------- */
    const nombreApellido = document.getElementById('datosClienteInput');
    const datos = nombreApellido.value;

    const preJsonDatos = {
        Nombre: datos
    };

    const jsonDatos = JSON.stringify(preJsonDatos);
    localStorage.setItem('datos_clientes', jsonDatos);

    /* ---------------------------------------------------- Estructura JSON cantidad de comensales ---------------------------------------------------- */

    const comensalesCantidad = document.getElementById('cantidadComensalesInput');
    const cantidadReserva = comensalesCantidad.value;

    const preJsonComensales = {
        Comensales: cantidadReserva
    };

    const jsonComensales = JSON.stringify(preJsonComensales);
    localStorage.setItem('cantidad_de_comensales', jsonComensales);

    /* ---------------------------------------------------- Estructura JSON hora de reserva ---------------------------------------------------- */

    const horaReserva = document.getElementById('horarioReservaInput');
    const horario = horaReserva.value;

    const preJsonHorario = {
        Horario: horario
    };

    const jsonHorario = JSON.stringify(preJsonHorario);
    localStorage.setItem('horario_reserva', jsonHorario);

    // Mensaje de éxito
    Swal.fire({
        title: '¿Deseas confirmar tu reserva?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('¡Reserva confirmada!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('La reserva no ha sido confirmada', '', 'info');
        }
    });
});