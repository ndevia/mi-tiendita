const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const { sequelize } = require("./src/models/Planta");

const app = express();
const PORT = 3000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// rutas
app.get("/", (req, res) => {
    res.send("hola")
});

sequelize.sync({ force: true })
   .then(() => {
        console.log("Base de datos ha sido sincronizada");
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
       console.error('Error al conectar con la base de datos: ', err);
    })