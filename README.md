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




DOCUMENTACIÓN ENDPOINTS
-----------------------


- LOGIN (los datos del siguiente ejemplo sirven para autenticarse como usuario administrador)

    URL: http://localhost:3000/login/

    REQUEST:

        METHOD: POST
        BODY: 
        {
            "email": "admin@delilah.com",
            "password": "1234"
        }

    RESPONSE:

        BODY:
        {
            "token": "eyJh..."
        }



- CREATE USER (por defecto los nuevos usuarios son creados con el role "user")

    URL: http://localhost:3000/users/

    REQUEST:

        METHOD: POST
        BODY:
        {
            "full_name": "Javier Cuenca",
            "email": "javier@rapihogar.com",
            "phone": "3513471202",
            "full_address": "avenida siempreviva 1234",
            "password": "35252525"
        }

    RESPONSE:

        BODY:
        {
            "full_name": "Javier Cuenca",
            "email":"javier@rapihogar.com",
            "phone": "3513471202",
            "full_address": "avenida siempreviva 1234",
            "password": "35252525"
            "user_id": 2
        }



- LIST USERS (si el usuario logueado tiene rol de administrador, lista todos los usuarios, si no lista los datos del usuario logueado)

    URL: http://localhost:3000/users/

    REQUEST:

        METHOD: GET
        HEADERS:
            Authorization = Bearer: {token}
        

    RESPONSE:
        [
            {
                "user_id": 1,
                "full_name": "Super admin",
                "email": "admin@delilah.com",
                "phone": "3515555555",
                "full_address": "Av. Siempreviva 576",
                "password": "1234",
                "role": "admin"
            },
            {
                "user_id": 2,
                "full_name": "Javier Cuenca",
                "email": "javier@rapihogar.com",
                "phone": "3513471202",
                "full_address": "avenida siempreviva 1234",
                "password": "35252525",
                "role": "user"
            }
        ]



- CREATE PRODUCT (solo puede ser utilizado por usuarios con rol de administrador)

    URL: http://localhost:3000/products/

    REQUEST:

        METHOD: POST

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

        BODY:
        {
            "title": "Pizza Especial",
            "price":"5.99"
        }

    RESPONSE:

        BODY:
        {
            "title": "Pizza Especial",
            "price": "5.99",
            "product_id": 1
        }



- MODIFY PRODUCT (solo puede ser utilizado por usuarios con rol de administrador)

    URL: http://localhost:3000/products/{product_id}/

    REQUEST:

        METHOD: PUT

        HEADERS:
        {
            Authorization = Bearer: {token}
        }

        BODY:
        {
            "title": "Pizza Especial",
            "price":"6.99"
        }

    RESPONSE:

        BODY:
        {
            "title": "Pizza Especial",
            "price": "6.99",
        }



- GET PRODUCT (solo usuarios logueados pueden listar los productos, cualquiera sea su rol)

    URL: http://localhost:3000/products/{product_id}/

    REQUEST:

        METHOD: GET

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

    RESPONSE:
    
        BODY:
        [
            {
                "product_id": 1,
                "title": "Pizza Especial",
                "price": "5.99"
            }
        ]


- LIST PRODUCTS (solo usuarios logueados pueden listar los productos, cualquiera sea su rol)

    URL: http://localhost:3000/products/

    REQUEST:

        METHOD: GET

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

    RESPONSE:

        BODY:
        [
            {
                "product_id": 1,
                "title": "Pizza Especial B",
                "price": "5.99"
            }
        ]