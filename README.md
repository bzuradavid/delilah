
# delilah-restó

Instructions for installing and running the project in a local environment
--------------------------------------------------------------------------

1) Download and install the LTS version of Node.js (https://nodejs.org/)
2) On the command line, go to the folder where you would like to clone the repository
3) Clone the repository running the following command:

    git clone https://github.com/bzuradavid/delilah-REST-API.git

4) Install WAMP if you are using Windows or MAMP if you are running MAC OS
5) Configure MAMP or WAMP setting the port 3306 to run MySQL
6) Configure MAMP or WAMP selecting the project's root folder as the Web Server's root folder
7) From the command line, while positioned on the project's root folder, run the following command: 

    npm install

8) Create the file .env on the project's root folder.
9) This file must have the following content, replacing "root" at USER and PASS
    with the acces credentials provided by MAMP or WAMP (The following is the default for MAMP):

    DB_HOST = localhost,
    PORT = 3306,
    DB_USER = root,
    DB_PASS = root,
    DB_NAME = delilah,
    DIALECT = mysql

9) Start the server on MAMP or WAMP
10) On the project's root folder, run the following command to create the database and the admin user:

    npm run create-db

11) On the project's root folder, run the following command to run the server:

    npm start



ENDPOINTS DOCS
--------------


- LOGIN (the following example is the admin user created with the database)

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



- CREATE USER (new users are created with "user" role by default)

    URL: http://localhost:3000/users/

    REQUEST:

        METHOD: POST

        BODY:
        {
            "full_name": "Test user",
            "email": "test@user.com",
            "phone": "3515555555",
            "full_address": "Av. Velez Sarsfield 576",
            "password": "5678"
        }

    RESPONSE:

        {
            "full_name": "Test user",
            "email": "test@user.com",
            "phone": "3515555555",
            "full_address": "Av. Velez Sarsfield 576",
            "password": "5678"
            "user_id": 2
        }



- LIST USERS (if the logged user has the "admin" role, it lists all of the users, otherwise it lists the data of the logged user)

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
                "full_name": "Test user",
                "email": "test@user.com",
                "phone": "3515555555",
                "full_address": "Av. Velez Sarsfield 576",
                "password": "5678",
                "role": "user"
            }
        ]



- CREATE PRODUCT (can only be utilised by users with "admin" role)

    URL: http://localhost:3000/products/

    REQUEST:

        METHOD: POST

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

        BODY:
        {
            "title": "Pizza",
            "price":"2.99"
        }

    RESPONSE:

        {
            "title": "Pizza",
            "price": "2.99",
            "product_id": 1
        }



- MODIFY PRODUCT (can only be utilised by users with "admin" role)

    URL: http://localhost:3000/products/{product_id}/

    REQUEST:

        METHOD: PUT

        HEADERS:
        {
            Authorization = Bearer: {token}
        }

        BODY:
        {
            "title": "Pizza",
            "price":"3.99"
        }

    RESPONSE:

        {
            "title": "Pizza",
            "price": "3.99",
        }



- GET PRODUCT (only logged users can get the product's detail)

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
                "title": "Pizza",
                "price": "3.99"
            }
        ]



- LIST PRODUCTS (only logged users can list all the products)

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
                "title": "Pizza",
                "price": "3.99"
            },
            {
                "product_id": 2,
                "title": "Special Pizza",
                "price": "4.99"
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




- LIST ORDERS (list all orders for "admin" users otherwise lists the logged user's orders)

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

- CHANGE ORDER STATUS (Only users with "admin" role can utilise this endpoint):
    
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


- DELETE ORDER (Only users with "admin" role can utilise this endpoint):
    
    URL: http://localhost:3000/order/{order_id}/

    REQUEST:

        METHOD: DELETE

        HEADERS:
        {
            Authorization = Bearer: {{token}}
        }

    RESPONSE:

        "El pedido #{pedido_id} ha sido eliminado"
    


