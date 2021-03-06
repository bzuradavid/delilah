

const express = require('express');
const bodyParser = require('body-parser');
const LoginRoutes = require('./routes/login');
const ProductRoutes = require('./routes/products'); 
const UserRoutes = require('./routes/users'); 
const OrderRoutes = require('./routes/orders'); 
const app = express();

app.use(bodyParser.json());
app.use("/login", LoginRoutes);
app.use("/products", ProductRoutes);
app.use("/users", UserRoutes);
app.use("/orders", OrderRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
 