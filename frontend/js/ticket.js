import { iniciarTema, toggleTema, obtenerNombre ,actualizarBadgeCarrito , formatearPrecio} from './utils.js';
import { apiVentas } from './api/cliente-api.js'; 
iniciarTema();
actualizarBadgeCarrito();
document.getElementById('btnTema').addEventListener('click', toggleTema);

const nombre = obtenerNombre();
if (!nombre) window.location.href = 'index.html';

const ventaId = sessionStorage.getItem('nextplay_venta_id');
if (!ventaId) window.location.href = 'index.html';

const contenedor = document.getElementById('ticketContenido');
function formatearFecha(fechaISO) {
    return new Date(fechaISO).toLocaleDateString('es-AR', {day: "2-digit", month:"2-digit", year:"numeric"});
}

function renderTicket(venta) {
    const productos = venta.productos;
    const filasHTML = productos.map((p)=> {
        const cantidad = p.VentaProducto.cantidad;
        const precioUnit = p.VentaProducto.precio_unitario;
        const subtotal = cantidad * precioUnit;
        return `
            <tr>
                <td class="ticket-tabla__nombre">${p.nombre}</td>
                <td class="ticket-tabla__centro">${cantidad}</td>
                <td class="ticket-tabla__centro">${formatearPrecio(precioUnit)}</td>
                <td class="ticket-tabla__derecha">${formatearPrecio(subtotal)}</td>
            </tr>
        `
    }).join('');

    contenedor.innerHTML = `
        <div class="ticket-card">
            <div class="ticket-card__header">
                <div class="ticket-success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <h2>¡Compra confirmada!</h2>
                <p>Comprobante N.° <strong>${venta.id}</strong> · ${formatearFecha(venta.fecha)}</p>
            </div>

            <div class="ticket-card__body">
                <div class="ticket-meta">
                    <span>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>

                        </svg>
                        ${venta.nombre_cliente}
                    </span>
                </div>

                <table class="ticket-tabla">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th class="ticket-tabla__centro">Cant.</th>
                            <th class="ticket-tabla__centro">Precio</th>
                            <th class="ticket-tabla__derecha">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>${filasHTML}</tbody>
                </table>


                <div class="ticket-total">
                    <span>Total</span>
                    <span>${formatearPrecio(venta.total)}</span>
                </div>

            </div>

            <div class="ticket-card__footer">
                <a href="${apiVentas.urlTicketPDF(venta.id)}" target="_blank" class="btn btn-primary btn-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="12" y1="18" x2="12" y2="12"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                    Ver / Descargar ticket PDF
                </a>
                <a href="productos.html" class="btn btn-outline btn-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Seguir comprando
                </a>
            </div>
        </div>`;

}

function renderError() {
    contenedor.innerHTML = `
        <div class="ticket-error">
            <p>No se pudo cargar el ticket. Puede que la venta no exista o haya un problema con el servidor.</p>
            <a href="productos.html" class="btn btn-primary">Volver a productos</a>
        </div>`;
}

function renderCargando() {
    contenedor.innerHTML = `
        <div class="ticket-cargando">
            <div class="spinner"></div>
            <span>Cargando tu ticket...</span>
        </div>`;
}

renderCargando();
apiVentas.obtener(ventaId).then(renderTicket).catch(renderError);