const API_BASE = "http://localhost:3000/api";

const obtenerJSON = (respuesta) => {
    if (!respuesta.ok) return respuesta.json().then((err)=> Promise.reject(err));
    return respuesta.json();
};

export const apiProductos = {
    listar: (pagina = 1, limite = 100) => fetch(`${API_BASE}/productos?pagina=${pagina}&limite=${limite}`).then(obtenerJSON),
}

export const apiVentas = {
    crear: (datos) => fetch(`${API_BASE}/ventas`, {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos),}).then(obtenerJSON),

    obtener: (id) => fetch(`${API_BASE}/ventas/${id}`).then(obtenerJSON),
    
    urlTicketPDF: (id)=> `${API_BASE}/ventas/${id}/ticket`,
};