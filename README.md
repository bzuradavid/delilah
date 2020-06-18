
# delilah-restó

Instrucciones para instalar y correr el proyecto en el entorno local
--------------------------------------------------------------------

Si ya posee los archivos del proyecto en su ordenador, omitir pasos 2, 3 y 8.

1) Descargar e instalar la versión LTS de Node.js desde su página oficial (https://nodejs.org/es/)
2) En la línea de comandos, posicionarse en la carpeta donde desea clonar el repositorio
3) Clonar el repositorio del proyecto ejecutando el siguiente comando:

    git clone https://github.com/bzuradavid/delilah.git

4) Instalar WAMP si el entorno es Windows o MAMP si es MAC OS
5) Configurar MAMP o WAMP seleccionando el puerto 3306 para que corra MySQL
6) Configurar MAMP o WAMP seleccionando la carpeta raíz de nuestro proyecto como carpeta raíz del Web Server
7) Desde la línea de comandos, posicionados en la carpeta raíz de nuestro proyecto, 
    ejecutar el siguiente comando para instalar las dependencias del mismo:

    npm install

8) Crear el archivo .env en la carpeta raíz del proyecto.
9) El archivo .env debe poseer el siguiente contenido, reemplazando "root" en USER y PASS
    por los accesos provistos por MAMP o WAMP (Los siguientes son los datos de acceso por defecto en MAMP):

    DB_HOST = localhost,
    PORT = 3306,
    DB_USER = root,
    DB_PASS = root,
    DB_NAME = delilah,
    DIALECT = mysql

9) Inicializar el servidor en MAMP o WAMP
10) En la carpeta raíz del proyecto, ejecutar el siguiente comando para crear la base de datos y en ella el Usuario Administrador:

    npm run create-db

11) En la carpeta raíz del proyecto, ejecutar el siguiente comando para correr el servidor:

    npm start



DOCUMENTACIÓN ENDPOINTS
-----------------------


- LOGIN (los datos del siguiente ejemplo son los del usuario administrador que se crea al crear la base de datos)

    URL: http://localhost:3000/login/

    REQUEST:

        METHOD: POST
        
        BODY: 
        {
            "email": "admin@delilah.com",
            "password": "1234"
        }

    RESPONSE:

        {
            "token": "eyJh..."
        }



- CREATE USER (por defecto los nuevos usuarios son creados con el role "user")

    URL: http://localhost:3000/users/

    REQUEST:

        METHOD: POST

        BODY:
        {
            "full_name": "Usuario de ejemplo",
            "email": "usuario@ejemlo.com",
            "phone": "3515555555",
            "full_address": "Av. Velez Sarsfield 576",
            "password": "5678"
        }

    RESPONSE:

        {
            "full_name": "Usuario de ejemplo",
            "email": "usuario@ejemlo.com",
            "phone": "3515555555",
            "full_address": "Av. Velez Sarsfield 576",
            "password": "5678"
            "user_id": 2
        }



- LIST USERS (si el usuario logueado tiene rol de administrador, lista todos los usuarios, si no lista los datos del usuario logueado)

    URL: http://localhost:3000/users/

    REQUEST:

        METHOD: GET

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }
        

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
                "full_name": "Usuario de ejemplo",
                "email": "usuario@ejemlo.com",
                "phone": "3515555555",
                "full_address": "Av. Velez Sarsfield 576",
                "password": "5678",
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

        [
            {
                "product_id": 1,
                "title": "Pizza Especial",
                "price": "5.99"
            },
            {
                "product_id": 2,
                "title": "Pizza Especial Con Champignones",
                "price": "6.99"
            }
        ]



- CREATE ORDER

    URL: http://localhost:3000/orders/

    REQUEST:

        METHOD: POST

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

        BODY:
        {
            "payment_method_id": 1,
            "products": [
                {
                    "product_id": 1,
                    "quantity": 2
                },
                {
                    "product_id": 2,
                    "quantity": 3
                }
            ]
        }

    RESPONSE:

        {
            "payment_method_id": 1,
            "products": [
                {
                    "product_id": 1,
                    "quantity": 2
                }
            ],
            "order_id": 2
        }




- LIST ORDERS (si el usuario es admin lista todos los pedidos, caso contrario lista los pedidos del usuario logueado)

    URL: http://localhost:3000/orders/

    REQUEST: 

        METHOD: GET

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

    RESPONSE:

        {
            "payment_method_id": 1,
            "products": [
                {
                    "product_id": 1,
                    "quantity": 2
                }
            ],
            "order_id": 1
        }

- CHANGE ORDER STATUS (Sólo un usuario con rol de administrador puede realizar esta acción):
    
    URL: http://localhost:3000/order/{order_id}/

    REQUEST:

        METHOD: PUT

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

        BODY:
        {
            "status_id": 2
        }

    RESPONSE:

        [
            {
                "order_id": 1,
                "user_id": 1,
                "status_id": 2,
                "payment_method_id": 1,
                "created_date": "2020-06-18T18:29:30.000Z"
            }
        ]


