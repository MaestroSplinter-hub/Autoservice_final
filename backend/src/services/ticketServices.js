import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { formatearMoneda, formatearFecha, formatearProducto } from "../utils/ticketUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_PLANTILLA = path.join(__dirname, "../views/ticket.ejs");

const armarDatosPlantilla = (venta) => {
    const productosFormateados = venta.productos.map(formatearProducto);
    return {
        id: venta.id,
        nombreCliente: venta.nombre_cliente,
        fecha: formatearFecha(venta.fecha),
        total: formatearMoneda(venta.total),
        productos: productosFormateados
    };
};

const renderizarHTML = (datosPlantilla) => ejs.renderFile(RUTA_PLANTILLA, datosPlantilla);

const generarPDFdesdeHTML = (html) => {
    let navegador;
    const opcionesNavegador = {headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"]};

    const abrirNavegador = (opciones) => puppeteer.launch(opciones);

    const abrirPestania = (instanciaNavegador) => {
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

    return abrirNavegador(opcionesNavegador)
                    .then(abrirPestania)
                    .then(configurarContenido)
                    .then(exportarPDF)
                    .catch(manejarError)
                    .finally(limpiarRecursos);
};

export const generarTicketPDF = (venta) => {
    const datosPlantilla = armarDatosPlantilla(venta);
    return renderizarHTML(datosPlantilla).then(generarPDFdesdeHTML);
};