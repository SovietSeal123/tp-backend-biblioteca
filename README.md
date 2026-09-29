# README - Sistema Gestor de libros

## 1. Objetivo del proyecto.

El objetivo de este proyecto es proporcionar a una librería una forma fácil de poder crear, leer, actualizar y borrar los libros de su catálogo.

-------------------------------------------------------

## 2. Funcionalidades.

El proyecto cuenta con las siguientes funcionalidades:

* <b>info:</b> Muestra los comandos disponibles.
* <b>read:</b> Muestra todos los libros dentro de la base de datos.
* <b>create:</b> Crea un libro utilizando los siguientes campos: "title" - "author" - "price" - "stock".
* <b>update:</b> Permite actualizar un libro utilizando el _id específico y proporcionando nuevamente los datos del libro.

* <b>delete:</b> Elimina un libro usando su _id.

-------------------------------------------------------

## 3. Tecnologías utilizadas.

* <b>TypeScript
* MongoDB
* Node.js</b>

-------------------------------------------------------

## 4. Dependencias

Las principales dependencias utilizadas por el proyecto son:

* <b>typescript:</b> Permite desarrollar el proyecto utilizando TypeScript.
* <b>tsx:</b> Permite ejecutar los archivos TypeScript directamente.
* <b>@types/node:</b> Proporciona los tipos necesarios para utilizar funcionalidades de Node.js desde TypeScript.
* <b>mongodb</b>: Permite establecer la conexión con MongoDB y realizar las operaciones sobre los documentos.

-------------------------------------------------------

## 5. Instalación y configuración

Para utilizar el proyecto es necesario contar con Node.js y MongoDB instalados.

Luego de descargar o clonar el proyecto, se deben instalar las dependencias necesarias mediante:

npm install

La conexión con MongoDB se configura mediante una variable de entorno URI_DB, que debe contener la dirección de la base de datos utilizada por el proyecto.

-------------------------------------------------------

## 6. Uso

El programa funciona mediante comandos ejecutados desde la terminal utilizando el script "dev".

Las operaciones disponibles son:

* <b>npm run dev info:</b> Obtener todos los comandos disponibles.
* <b>npm run dev read:</b> Obtener todos los libros.
* <b>npm run dev create:</b> Crear un nuevo libro.
* <b>npm run dev update id:</b> Actualizar un libro mediante su _id.
* <b>npm run dev delete id:</b> Eliminar un libro mediante su _id.

Cada operación requiere los datos correspondientes para poder ejecutarse correctamente.

-------------------------------------------------------

## 7. Estructura de los datos

Los libros almacenados utilizan los siguientes campos y tipos de datos:

* <b>title:</b> string.
* <b>author:</b> string.
* <b>price:</b> number
* <b>stock:</b> number.

Además, MongoDB genera automáticamente un _id de tipo ObjectId para identificar cada documento.

Los campos numéricos son validados para evitar la introducción de valores no numéricos.
