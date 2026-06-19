import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_PLANTILLA = path.join(__dirname, "../views/ticket.ejs");

const formatearMoneda = (valor) => new Intl.NumberFormat ("es-AR", {style: "currency", currency: "ARS", maximumFractionDigits: 0}).format(valor);

const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString("es-AR", {day: "2-digit", month:"2-digit", year:"numeric"});

const armarDatosPlantilla = (venta) => {
    const productos = venta.productos.map((producto) => {
        const cantidad = producto.VentaProducto.cantidad;
        const precioUnitario = producto.VentaProducto.precio_unitario;
        const subtotal = cantidad * precioUnitario;
        return {
            nombre: producto.nombre,
            cantidad,
            precioUnitario: formatearMoneda(precioUnitario),
            subtotal: formatearMoneda(subtotal)
        };
    });
    return {
        id: venta.id,
        nombreCliente: venta.nombre_cliente,
        fecha: formatearFecha(venta.fecha),
        total: formatearMoneda(venta.total),
        productos
    };
};

const renderizarHTML = (datosPlantilla) => ejs.renderFile(RUTA_PLANTILLA, datosPlantilla);

const generarPDFdesdeHTML = (html) => {
    let navegador;

    const iniciarNavegador = (instanciaNavegador) => {
        navegador = instanciaNavegador;
        return navegador.newPage();
    };

    const configurarContenido = (pagina) => pagina.setContent(html, { waitUntil: "networkidle0" }).then(() => pagina); 

    const exportarPDF = (pagina) => pagina.pdf({format: "A4", printBackground: true, margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" }});

    const manejarError = (error) => {
        console.error("Error generando el PDF:", error);
        throw error;
    };

    const limpiarRecursos = () => {
        if (navegador) {
            return navegador.close();
        }
    };

    return puppeteer.launch({headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"]})
                    .then(iniciarNavegador)
                    .then(configurarContenido)
                    .then(exportarPDF)
                    .catch(manejarError)
                    .finally(limpiarRecursos);
};

export const generarTicketPDF = (venta) => {
    const datosPlantilla = armarDatosPlantilla(venta);
    return renderizarHTML(datosPlantilla).then(generarPDFdesdeHTML);
};