import { crearNuevaVenta, leerVentaConDetalle } from "../services/ventaServices.js";
import { generarTicketPDF } from "../services/ticketServices.js";
import { manejarErrores, responderExito } from "../utils/utilidades.js";

export const createVenta = (req, res) => {
    const { nombreCliente, total, productos } = req.body;
    const datos = { nombreCliente, total, productos };

    const enviarExito = (nuevaVenta) => res.status(201).json({ status: true, venta: nuevaVenta, mensaje: "Venta registrada con éxito" });

    crearNuevaVenta(datos)
        .then(enviarExito)
        .catch(manejarErrores(res));
};

export const getTicketVenta = (req, res) => {
    const { id } = req.params;
    const enviarPDF = (bufferPDF) => {
        res.setHeader("Content-type", "application/pdf");
        res.setHeader("Content-Disposition",`inline; filename="ticket-${id}.pdf"`);
        res.send(bufferPDF);

    };

    leerVentaConDetalle(id)
        .then(generarTicketPDF)
        .then(enviarPDF)
        .catch(manejarErrores(res))
}

export const getVenta = (req,res) => {
    const {id} = req.params;
    leerVentaConDetalle(id)
        .then(responderExito(res))
        .catch(manejarErrores(res));
};