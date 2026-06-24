const TEMA_KEY = 'nextplay_tema';

export function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem(TEMA_KEY, tema);
    actualizarIconoTema(tema);
}

export function obtenerTema() {
    try {
        return localStorage.getItem(TEMA_KEY) || 'light';
    } catch {
        return 'light';
    }
}


export function toggleTema() {
    const actual = document.documentElement.getAttribute('data-theme') || 'light';
    const nuevo = actual === 'light' ? 'dark' : 'light';

    aplicarTema(nuevo)
}

function actualizarIconoTema(tema) {
    const sol = document.getElementById('iconoSol');
    const luna = document.getElementById('iconoLuna');
    if (!sol || !luna) return;
    if (tema === 'dark') {
        sol.style.display = 'block';
        luna.style.display= 'none';
    } else {
        sol.style.display = 'none'
        luna.style.display = 'block' 
    }
}  


export function iniciarTema() {
    const tema = obtenerTema();
    aplicarTema(tema);
}

// Manejo de nombre de usuario
const NOMBRE_KEY = 'nextplay_nombre';

export function guardarNombre(nombre) {
    sessionStorage.setItem(NOMBRE_KEY, nombre.trim());
}

export function obtenerNombre() {
    return sessionStorage.getItem(NOMBRE_KEY) || null;
}

export function limpiarSession() {
    sessionStorage.clear();
}


const CARRITO_KEY = 'nextplay_carrito';

export function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    } catch {
        return [];
    }
}

export function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

export function limpiarCarrito() {
    localStorage.removeItem(CARRITO_KEY);
    actualizarBadgeCarrito();
}

export function actualizarBadgeCarrito() {
    const badge = document.getElementById('carritoBadge');
    if (!badge) return;

    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

//notificaciones

export function mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
    let contenedor = document.getElementById('toastContainer');
    
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'toastContainer';
        contenedor.className = 'toast-container';
        document.body.appendChild(contenedor);
    }

    const iconos = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `${iconos[tipo] || ''}<span>${mensaje}</span>`;

    contenedor.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duracion);

}

// fromateo de precio

export function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(valor);
}

export function capitalizarNombre(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}
