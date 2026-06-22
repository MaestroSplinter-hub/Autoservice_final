const esNumero = (valor) => typeof valor === "number";

export const esEntero = (valor) => Number.isInteger(valor);

export const esObjeto = (valor) => valor !== null && typeof valor === "object" && !Array.isArray(valor);

export const esCadena = (valor) => typeof valor === "string";

export const esDecimal = (valor) => {
    const tieneContenido = esCadena(valor) && valor.trim() !== "";

    if (esNumero(valor)) return !Number.isNaN(valor) && Number.isFinite(valor);
    if (tieneContenido) {
        const n = Number(valor);
        return !Number.isNaN(n) && Number.isFinite(n);
    }
    return false;
};

export const esUndefined = (valor) => valor === undefined;

export const obtenerBooleano = (valor) => {
    if (valor === true || valor === "true") return true;
    if (valor === false || valor === "false") return false;
    return null; 
};

export const obtenerNumero = (valor) => (esCadena(valor) ? Number(valor) : valor);

export const errorJson = (res, statusCode, mensaje) => res.status(statusCode).json({ status: false, mensaje });