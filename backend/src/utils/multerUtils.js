import path from 'path';
import { fileURLToPath } from "url";
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Donde se va a guardar el archivo
const definirDestino = (req, archivo, cb) => {
    const rutaCarpeta = path.join(__dirname, '../public/uploads');
    cb(null, rutaCarpeta);
}

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