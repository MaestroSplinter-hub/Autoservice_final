import path from 'path';
import { fileURLToPath } from "url";
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearDirectorio = (directorio) => fs.mkdirSync(directorio, { recursive: true });

export const asegurarUploadsDir = () => {
    const rutaDir = path.join(__dirname, '../public/uploads');
    crearDirectorio(rutaDir);
    return rutaDir;
};

// Donde se va a guardar el archivo
const definirDestino = async (req, archivo, cb) => {
    cb(null, asegurarUploadsDir());
};

// Le armo un nombre unico al archivo
const definirNombreArchivo = (req, archivo, cb) => {
    const tiempoActual = Date.now();
    const numeroAleatorio = Math.round(Math.random() * 1E9);
    const extension = path.extname(archivo.originalname);

    const nombreUnico = `${tiempoActual}-${numeroAleatorio}${extension}`;
    
    cb(null, nombreUnico);
};

// Creo la configuración de almacenamiento
const configAlmacenamiento = multer.diskStorage({
    destination: definirDestino,
    filename: definirNombreArchivo
});

export const subidorArchivos = multer({ storage: configAlmacenamiento });