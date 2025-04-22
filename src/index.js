import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import router from './routes/index.js';

// Cargar variables de entorno
dotenv.config();

// Crear servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
/* app.use(cors()); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

// Configurar motor de plantillas
app.set('view engine', 'pug');
app.set('views', 'src/views');

// Configurar sesión
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // true para HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 semana
    }
}));

// Configurar rutas
app.use('/', router);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});