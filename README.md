# 🌸 Mi Tiendita 🌸

> Este proyecto es una tienda en línea de plantas, donde los usuarios pueden comprar diversas especies de plantas disponibles en el inventario. El sistema permite agregar nuevas plantas, visualizar las compras y gestionar el stock de plantas en tiempo real.

## 🌿 Tecnologías Utilizadas

- Node.js: Para el backend y gestión del servidor.
- Express: Framework para crear las rutas y manejar las solicitudes HTTP.
- Sequelize: ORM para la gestión de la base de datos y las relaciones entre las tablas.
- PostgreSQL: Sistema de base de datos utilizado para almacenar la información de las plantas y las compras.
- Handlebars: Motor de plantillas utilizado para renderizar las vistas.
- Bootstrap: Framework de CSS utilizado para el diseño responsivo y la estructura de las vistas.

## 🌵Estructura de la Base de Datos
### 🌻 Modelo Planta 

El modelo Planta tiene la siguiente estructura:
- `genero`: Género de la planta (requerido).
- `especie`: Especie de la planta (opcional).
- `nombre_comun`: Nombre común de la planta (opcional).
- `precio`: Precio de la planta (requerido).
- `cantidad`: Cantidad disponible en stock (requerido).
- `disponible`: Indica si la planta está disponible para compra.

### 🌷 Modelo Compra

El modelo Compra almacena las compras realizadas, con las siguientes propiedades:
- `fecha`: Fecha de la compra (por defecto es la fecha actual).
- `total`: Total de la compra (calculado automáticamente al realizar la compra).

### 🌼Modelo CompraPlanta

El modelo CompraPlanta es una tabla intermedia que representa la relación entre Compra y Planta. Contiene:
- `cantidad`: La cantidad de comprada de cada planta.
- `precio_unitario`: El precio de la planta por unidad.
- `subtotal`: El subtotal de la planta comprada (precio unitario * cantidad).

## 🏵️ Cómo Ejecutar

#### 1. Clonar el repositorio:
- git clone https://github.com/ndevia/mi-tiendita.git

#### 2. Navegar a la carpeta del proyecto:
-  cd mi-tiendita

#### 3. Instalar dependencias:
- Abrir el proyecto en `VS Code`
- Abrir la terminal y asegurarse de estar en la carpeta raíz del proyecto o navegar a ésta:
  - `cd mi-tiendita`
- Ejecutar el siguiente comando para instalar las dependencias: 
  - `npm install`

#### 4. Crear la base de datos:
- La base de datos utilizada se llama `mi-tiendita`.
- El archivo `mi_tiendita.sql` incluye las instrucciones para crear la base y conectarse a ella.

#### 5. Configurar las credenciales de la base de datos en el archivo `.env`:
    
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=TU_USUARIO
        DB_PASSWORD=TU_CONTRASEÑA
        DB_NAME=mi_tiendita
        DB_DIALECT=postgres
    
- Reemplazar **TU_USUARIO** con el nombre de usuario en PostgreSQL (generalmente es **postgres** por defecto). 
- Reemplazar **TU_CONTRASEÑA** con la contraseña para PostgreSQL.

#### 6. Ejecutar el servidor:
- Para iniciar el servidor utilizar el comando:
  - `node server.js`
- Alternativamente, dado que el proyecto incluye `Nodemon`, también se puede ejecutar en modo desarrollo con:
  - `npm run dev`

## 🫘 Seeders

El proyecto incluye datos de prueba para facilitar la visualización y pruebas de la aplicación. 

Para resetear y poblar la base de datos con plantas de ejemplo, ejecutar:

```
node src/seeders/plantasSeeder.js
```

Este script:
- Elimina los datos existentes
- Reinicia los IDs
- Agrega plantas de prueba a la base de datos

## 🌱 Rutas del Proyecto 
### 🍃 Rutas para Plantas 
- `GET /plantas`: Muestra todas las plantas disponibles en la tienda.
- `GET /plantas/new`: Muestra el formulario para agregar una nueva planta.
- `POST /plantas`: Crea una nueva planta en el inventario.
- `GET /plantas/:id`: Muestra el detalle de una planta.
- `GET /plantas/:id/edit`: Muestra el formulario para editar una planta.
- `PUT /plantas/:id`: Actualiza la información de una planta.
- `DELETE /plantas/:id`: Elimina una planta del inventario.

## 🍂 Rutas para Compras
- `GET /compras`: Muestra todas las compras realizadas.
- `GET /compras/new`: Muestra el formulario para realizar una nueva compra.
- `POST /compras`: Crea una nueva compra y actualiza el stock de las plantas.
- `GET /compras/:id`: Muestra los detalles de una compra.

## 🌴 Notas

- Se incluye un archivo mi_tiendita.sql con los comandos para crear la base de datos.
- Se considera que las compras no se debiesen editar ni eliminar, por lo que no se incluyó `PUT` ni `DELETE` para ellas

## 🚀 Próximos Pasos 

- Implementar la autenticación de usuarios (clientes y administradores).
- Implementar que cada cliente pueda ver sólo sus compras.
- Agregar la posibilidad de cargar imágenes para las plantas.
- Mejorar la validación de entradas para evitar errores comunes.