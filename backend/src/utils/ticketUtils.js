const formatearMoneda = (valor) => new Intl.NumberFormat ("es-AR", {style: "currency", currency: "ARS", maximumFractionDigits: 0}).format(valor);

const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString("es-AR", {day: "2-digit", month:"2-digit", year:"numeric"});

const formatearProducto = (producto) => {
    const cantidad = producto.VentaProducto.cantidad;
    const precioUnitario = producto.VentaProducto.precio_unitario;
    const subtotal = cantidad * precioUnitario;
    return {
        nombre: producto.nombre,
        cantidad,
        precioUnitario: formatearMoneda(precioUnitario),
        subtotal: formatearMoneda(subtotal)
    };
}

export const armarDatosPlantilla = (venta) => {
    const productosFormateados = venta.productos.map(formatearProducto);
    return {
        id: venta.id,
        nombreCliente: venta.nombre_cliente,
        fecha: formatearFecha(venta.fecha),
        total: formatearMoneda(venta.total),
        productos: productosFormateados
    };
};

export const generarPDFdesdeHTML = (html) => {
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

    const limpiarRecursos = () => {if (navegador) return navegador.close();};

    return abrirNavegador(opcionesNavegador)
                    .then(abrirPestania)
                    .then(configurarContenido)
                    .then(exportarPDF)
                    .catch(manejarError)
                    .finally(limpiarRecursos);
};