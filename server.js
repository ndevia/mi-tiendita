const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const { sequelize } = require("./src/models/Planta");

// routers
const plantasRouter = require("./src/routes/planta"); 

const app = express();
const PORT = 3000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// middlewares de rutas
app.use("/plantas", plantasRouter);

// rutas
app.get("/", (req, res) => {
  res.redirect("/plantas");
});

// error para ruta no encontrada
app.use((req, res) => {
  res.status(404).render("error", {
    status: 404,
    message: "Página no encontrada, por favor intenta otra vez."
  });
});

// middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error("Ha ocurrido un error: ", err);
  let status = err.status || 500;
  let message;

  if(!message) {
    switch(status) {
      case 400:
        message = "Solicitud incorrecta. Por favor revisa los datos enviados.";
        break;
      case 404:
        message = "Recurso no encontrado. Por favor intenta otra vez.";
        break;
      case 500:
        message = "Error interno del servidor. Por favor intenta más tarde."
        break;
      default:
        message = "Ha ocurrido un error inesperado. Por favor intenta más tarde."
        break;
    }
  }
  
  res.status(status).render("error", { status, message });
}); 

sequelize.sync({ alter: true })
   .then(() => {
        console.log("Base de datos ha sido sincronizada");
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
       console.error('Error al conectar con la base de datos: ', err);
    })