# delilah
Repositorio para el proyecto Delilah Resto de Acámica

Instrucciones para instalar y correr el proyecto en el entorno local.

- Descargar e instalar la versión LTS de Node.js desde su página oficial (https://nodejs.org/es/)
- En la línea de comandos, pararse en la carpeta donde desea clonar el repositorio
- Clonar el repositorio ejecutando el siguiente comando:
    git clone https://github.com/bzuradavid/delilah.git
- Instalar WAMP si el entorno es Windows o MAMP si es MAC OS
- Configurar MAMP o WAMP para que MySQL corra en el puerto 3306
- Configurar en MAMP o WAMP la carpeta raíz de nuestro proyecto como carpeta raíz del Web Server
- En la carpeta raíz de nuestro proyecto, ejecutar el siguiente comando para instalar las dependencias del mismo
    npm install
- Crear el archivo .env en la carpeta raíz del proyecto. Copiar en el mismo el siguiente contenido, reemplazando "root" en user y pass por
    los accesos provistos por MAMP o WAMP

    DB_HOST = localhost,
    PORT = 3306,
    USER = root,
    PASS = root,
    DB_NAME = delilah,
    DIALECT = mysql

- Inicializar el servidor en MAMP o WAMP
- En la carpeta raíz del proyecto, ejecutar el siguiente comando para crear la base de datos y en ella el Usuario Administrador
    npm run create-db
- En la carpeta raíz del proyecto ejecutar el siguiente comando para correr el servidor
    npm start

DOCUMENTACIÓN API

- ADMIN LOGIN

METHOD: POST

BODY: 
{
	"email":"david@gmail.com",
	"password":"1234"
}

