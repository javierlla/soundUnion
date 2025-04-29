import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import router from './routes/router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
 

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});


app.use((req, res, next) => {
    console.log('\n====== DEBUG REQUEST ======');
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    console.log('Session user:', req.session.user);
    console.log('==========================\n');
    next();
});


app.use('/', router);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});