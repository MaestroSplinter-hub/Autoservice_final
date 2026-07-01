import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { armarDatosPlantilla, generarPDFdesdeHTML } from "../utils/ticketUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_PLANTILLA = path.join(__dirname, "../views/ticket.ejs");

const renderizarHTML = (datosPlantilla) => ejs.renderFile(RUTA_PLANTILLA, datosPlantilla);

export const generarTicketPDF = (venta) => {
    const datosPlantilla = armarDatosPlantilla(venta);
    return renderizarHTML(datosPlantilla).then(generarPDFdesdeHTML);
};