import express from 'express';
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from './config/database.js'; 
import { router as usuarioRouter } from "./routes/usuarioRoutes.js";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as productoRouter } from "./routes/productoRoutes.js";
import { router as ventaRouter } from "./routes/ventaRoutes.js";
import { router as adminRouter } from "./routes/adminRoutes.js";
import { fileURLToPath } from 'url';

const app = express();
const PUERTO = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/usuarios", usuarioRouter);
app.use("/api/productos", productoRouter);
app.use("/api/ventas", ventaRouter)
app.use("/", authRouter);
app.use("/", adminRouter);

function iniciarServidor() {

    const probarConexion = () => sequelize.authenticate();

    const sincronizar = () => {
        if (process.env.SYNC_DB === 'true') {
            console.log('--> Sincronizando modelos con la base de datos...');
            return sequelize.sync({ alter: true });
        }
        return Promise.resolve(); 
    };

    const mostrarExito = () => {
        console.log('\n--> Conexión exitosa a MySQL...');
        app.listen(PUERTO, () => console.log(`--> Servidor en puerto ${PUERTO} en modo ${process.env.NODE_ENV}...`));
    };

    const mostrarError = (error) => console.error(`--> Error de conexión: ${error}`);

    probarConexion()
        .then(sincronizar)
        .then(mostrarExito)
        .catch(mostrarError);
}

iniciarServidor();