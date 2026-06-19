import { iniciarTema, toggleTema, obtenerNombre, obtenerCarrito, guardarCarrito, actualizarBadgeCarrito, mostrarToast, formatearPrecio } from "./utils.js";
import { apiProductos } from "./api/cliente-api.js";

iniciarTema();
actualizarBadgeCarrito();
document.getElementById('btnTema').addEventListener('click', toggleTema);

const nombre = obtenerNombre();
if (!nombre) window.location.href = 'index.html';

document.getElementById('saludo').textContent = `¡Hola ${nombre}! Explora nuestros productos`;

const PRODUCTOS_POR_PAGINA = 9;
let categoriaActual = 'videojuego';
let paginaActual = 1;
let todosLosProductos = [];

const grid = document.getElementById('productosGrid');
const paginacion = document.getElementById('paginacion');
const tituloCateg = document.getElementById('tituloCategoria');
const countElementos = document.getElementById('productosCount');
const btnVideojuegos = document.getElementById('btnVideojuegos');
const btnConsolas = document.getElementById('btnConsolas');

btnVideojuegos.addEventListener('click', () => cambiarCategoria('videojuego'));
btnConsolas.addEventListener('click', () => cambiarCategoria('consola'));

function mostrarCargando() {
    grid.innerHTML = `
        <div class="productos-loading">
            <div class="spinner"></div>
            <span>Cargando productos...</span>
        </div>`;
}

function mostrarErrorCarga() {
    grid.innerHTML = `
        <div class="productos-vacio">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>No se pudieron cargar los productos. ¿Está corriendo el servidor?</p>
        </div>`;
}

function cargarProductos() {
    mostrarCargando();

    const guardarYRenderizar = (data) => {
        todosLosProductos = data.productos;
        renderProductos();
    };

    const manejarError = (error) => {
        console.error("Error al obtener los productos:", error);
        mostrarToast("No se pudo conectar con el servidor", "error");
        mostrarErrorCarga();
    };

    apiProductos.listar().then(guardarYRenderizar).catch(manejarError);
}

function cambiarCategoria(categoria) {
    categoriaActual = categoria;
    paginaActual = 1;
    btnVideojuegos.classList.toggle('active', categoria === 'videojuego');
    btnConsolas.classList.toggle('active', categoria === 'consola');
    tituloCateg.textContent = categoria === 'videojuego' ? 'Videojuegos' : 'Consolas';
    renderProductos();
}

function renderProductos() {
    const filtrados = todosLosProductos.filter((p) => p.tipo === categoriaActual);
    const total = filtrados.length;
    const totalPags = Math.ceil(total / PRODUCTOS_POR_PAGINA);

    if (paginaActual > totalPags) paginaActual = 1;
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const pagina = filtrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

    countElementos.textContent = `${total} producto${total !== 1 ? 's' : ''}`;

    if (pagina.length === 0) {
        grid.innerHTML = `
            <div class="productos-vacio">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <p>No hay productos disponibles en esta categoría.</p>
            </div>`;
    } else {
        grid.innerHTML = pagina.map((p) => crearCardHTML(p)).join('');
        agregarEventosCards();
    }

    renderPaginacion(totalPags);
}

function crearCardHTML(producto) {
    const carrito = obtenerCarrito();
    const enCarrito = carrito.find((i) => i.id === producto.id);
    const cantidad = enCarrito ? enCarrito.cantidad : 0;

    const imgHTML = producto.imagen
        ? `<img class="producto-card__img" src="http://localhost:3000${producto.imagen}" alt="${producto.nombre}" loading="lazy" />`
        : `<div class="producto-card__img-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
            </div>`;

    const label = producto.tipo === 'videojuego' ? 'Videojuego' : 'Consola';

    return `
        <div class="producto-card" data-id="${producto.id}">
            <div class="producto-card__img-wrapper">
                ${imgHTML}
                <span class="producto-card__badge">${label}</span>
            </div>
            <div class="producto-card__body">
                <span class="producto-card__nombre">${producto.nombre}</span>
                <span class="producto-card__precio">${formatearPrecio(producto.precio)}</span>
            </div>
            <div class="producto-card__footer">
                ${cantidad === 0
                    ? `<button class="btn-agregar" data-id="${producto.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            Agregar
                        </button>`
                    : `<div class="cantidad-control visible" data-id="${producto.id}">
                            <button class="cantidad-btn btn-restar" data-id="${producto.id}">−</button>
                            <span class="cantidad-num">${cantidad}</span>
                            <button class="cantidad-btn btn-sumar" data-id="${producto.id}">+</button>
                        </div>`
                }
            </div>
        </div>`;
}

function agregarEventosCards() {
    grid.querySelectorAll('.btn-agregar').forEach((btn) => {
        btn.addEventListener('click', () => agregarAlCarrito(parseInt(btn.dataset.id)));
    });
    grid.querySelectorAll('.btn-sumar').forEach((btn) => {
        btn.addEventListener('click', () => cambiarCantidad(parseInt(btn.dataset.id), 1));
    });
    grid.querySelectorAll('.btn-restar').forEach((btn) => {
        btn.addEventListener('click', () => cambiarCantidad(parseInt(btn.dataset.id), -1));
    });
}

function agregarAlCarrito(id) {
    const producto = todosLosProductos.find((p) => p.id === id);
    if (!producto) return;

    const carrito = obtenerCarrito();
    const idx = carrito.findIndex((i) => i.id === id);

    if (idx === -1) {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, tipo: producto.tipo, cantidad: 1 });
    } else {
        carrito[idx].cantidad++;
    }

    guardarCarrito(carrito);
    mostrarToast(`"${producto.nombre}" agregado al carrito`, 'success');
    renderProductos();
}

function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const idx = carrito.findIndex((i) => i.id === id);
    if (idx === -1) return;
    carrito[idx].cantidad += delta;
    if (carrito[idx].cantidad <= 0) {
        carrito.splice(idx, 1);
        mostrarToast('Producto eliminado del carrito', 'info');
    }
    guardarCarrito(carrito);
    renderProductos();
}

function renderPaginacion(totalPags) {
    if (totalPags <= 1) { paginacion.innerHTML = ''; return; }

    let html = `
        <button class="paginacion__btn" id="btnAnterior" ${paginaActual === 1 ? 'disabled' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
            </svg>
        </button>`;

    for (let i = 1; i <= totalPags; i++) {
        html += `<button class="paginacion__btn ${i === paginaActual ? 'active' : ''}" data-pag="${i}">${i}</button>`;
    }

    html += `
        <button class="paginacion__btn" id="btnSiguiente" ${paginaActual === totalPags ? 'disabled' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </button>`;
    paginacion.innerHTML = html;

    document.getElementById('btnAnterior')?.addEventListener('click', () => {
        if (paginaActual > 1) { paginaActual--; renderProductos(); scrollTo(0, 0); }
    });
    document.getElementById('btnSiguiente')?.addEventListener('click', () => {
        if (paginaActual < totalPags) { paginaActual++; renderProductos(); scrollTo(0, 0); }
    });
    paginacion.querySelectorAll('[data-pag]').forEach((btn) => {
        btn.addEventListener('click', () => { paginaActual = parseInt(btn.dataset.pag); renderProductos(); scrollTo(0, 0); });
    });
}

cargarProductos();