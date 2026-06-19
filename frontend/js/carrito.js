import { iniciarTema, toggleTema, obtenerNombre, obtenerCarrito, guardarCarrito, limpiarCarrito,actualizarBadgeCarrito,mostrarToast, formatearPrecio } from './utils.js';
import { apiVentas } from './api/cliente-api.js';

iniciarTema();
actualizarBadgeCarrito();
document.getElementById('btnTema').addEventListener('click', toggleTema);

const nombre = obtenerNombre();
if (!nombre) {
    window.location.href = 'index.html';
}

const layout = document.getElementById('carritoLayout');
const subtitulo = document.getElementById('subtituloCarrito');
const modalConfirmar = document.getElementById('modalConfirmar');
const modalTexto = document.getElementById('modalTexto');
const btnCancelarModal = document.getElementById('btnCancelarModal');
const btnConfirmarModal = document.getElementById('btnConfirmarModal');

function renderCarrito() {
    const carrito = obtenerCarrito();
    actualizarBadgeCarrito();
    if (carrito.length === 0) {
        subtitulo.textContent= 'Tu carrito esta vacio';
        layout.innerHTML = `
            <div class="carrito-vacio">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <h3>No hay productos en tu carrito</h3>
                <p>Agregá productos desde la tienda para continuar.</p>
                <a href="productos.html" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Ir a productos
                </a>
            </div>`;
        return;
    }
    const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);
    const totalPrecio = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    subtitulo.textContent= `${totalItems} producto${totalItems !== 1 ? 's' : ''} en tu carrito.`;

    const listaHTML = `
        <div class="carrito-lista">
            ${carrito.map(item => crearItemHTML(item)).join('')}
        </div>`;
    const resumenHTML = `
        <div class="carrito-resumen">
            <h3>Resumen</h3>
            <div class="resumen-linea">
                <span>Productos (${totalItems})</span>
                <span>${formatearPrecio(totalPrecio)}</span>
            </div>
            <div class="resumen-linea total">
                <span>Total</span>
                <span>${formatearPrecio(totalPrecio)}</span>
            </div>
            <button class="btn-confirmar" id="btnConfirmar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Confirmar compra
            </button>

            <a href="productos.html" class="btn-seguir">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                </svg>
                Seguir comprando
            </a>
        </div>`;
    
    layout.innerHTML = listaHTML + resumenHTML;
    agregarEventosItems();
    document.getElementById('btnConfirmar').addEventListener('click', abrirModalConfirmar);
}

function crearItemHTML(item) {
    const subtotal = item.precio * item.cantidad;
    const imgHTML = item.imagen
        ?   `<img src="${item.imagen}" alt="${item.nombre}" />`
        :   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
            </svg>`; 
    return `
    <div class="carrito-item" data-id="${item.id}">
        <div class="carrito-item__img">${imgHTML}</div>

        <div class="carrito-item__info">
            <div class="carrito-item__nombre">${item.nombre}</div>
            <div class="carrito-item__tipo">${item.tipo}</div>
            <div class="carrito-item__precio-unit">${formatearPrecio(item.precio)} c/u</div>
        </div>

        <div class="carrito-item__cantidad">
            <button class="cantidad-btn btn-restar" data-id="${item.id}">−</button>
            <span class="cantidad-num">${item.cantidad}</span>
            <button class="cantidad-btn btn-sumar" data-id="${item.id}">+</button>
        </div>

        <div class="carrito-item__subtotal">${formatearPrecio(subtotal)}</div>

        <button class="btn-eliminar" data-id="${item.id}" title="Eliminar producto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
            </svg>
        </button>
    </div>`;
}

function agregarEventosItems() {
    layout.querySelectorAll('.btn-sumar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            cambiarCantidad(id, 1);
        });
    });
    layout.querySelectorAll('.btn-restar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            cambiarCantidad(id, -1);
        });
    });

    layout.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            eliminarItem(id);
        });
    });
}

function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex(i => i.id === id);
    if (idx === -1) return;

    carrito[idx].cantidad += delta;

    if (carrito[idx].cantidad <= 0) {
        carrito.splice(idx,1);
        mostrarToast('Quitando producto del carrito', 'info');
    }

    guardarCarrito(carrito);
    renderCarrito();
}

function eliminarItem(id) {
    const carrito = obtenerCarrito();
    const nuevo = carrito.filter(i => i.id !== id);
    guardarCarrito(nuevo);
    mostrarToast('Producto eliminado del carrito', 'info');
    renderCarrito();
}

function abrirModalConfirmar() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    modalTexto.textContent = `¿Quieres confirmar tu compra? Precio total: ${formatearPrecio(total)} A nombre de ${nombre}`;
    modalConfirmar.classList.add('visible');
}

function cerrarModal() {
    modalConfirmar.classList.remove('visible');
}

btnCancelarModal.addEventListener('click', cerrarModal);
modalConfirmar.addEventListener('click', (e) => {
    if (e.target === modalConfirmar) cerrarModal();
});

btnConfirmarModal.addEventListener('click', () => {
    cerrarModal();
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    const datos = {
        nombreCliente: nombre,
        total,
        productos: carrito.map((item) => ({
            id: item.id,
            cantidad: item.cantidad,
            precio: item.precio,
        })),
    };
    btnConfirmarModal.disabled = true;
    btnConfirmarModal.textContent = 'Procesando...';

    const manejarExito = (respuesta) => {
        limpiarCarrito();
        sessionStorage.setItem('nextplay_venta_id', respuesta.venta.id);
        window.location.href = 'ticket.html';
    };

    const manejarError = (error) => {
        console.error('Error al crear la venta:',error);
        mostrarToast('Hubo un error al procesar la compra. Intente de nuevo', 'error');
        btnConfirmarModal.disabled = false;
        btnConfirmarModal.textContent = 'Confirmar';
    };
    
    apiVentas.crear(datos).then(manejarExito).catch(manejarError);
});

renderCarrito();