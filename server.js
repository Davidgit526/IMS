const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  fromLocation: String,
  toLocation: String,
  dateOfJourney: String,
  age: Number,
  gender: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);*/

/*const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
 
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  // Once connected, you can start querying and displaying data from MongoDB
  Reservation.find({})
    .then(reservations => {
      console.log('Reservations:', reservations);
    })
    .catch(err => {
      console.error('Error fetching reservation:', err);
    });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
 
// MongoDB Schema
const reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  fromLocation: String,
  toLocation: String,
  dateOfJourney: String,
  age: Number,
  gender: String,
});
 
const Reservation = mongoose.model('Reservation', reservationSchema);
*/

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    Product.find({})
      .then(product => {
        console.log('Product:', product);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
      });
    });

    
const productSchema = new mongoose.Schema({
  productId: Number,
  productName: String,
  productDescription: String,
  productCategory: String,
  productBrand: String,
  productManufracturer: String,
  unitOfMeasure: Number,
  costPrice: Number,
  sellingprice: Number,
});

const Product = mongoose.model('Product', productSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const { productId, productName, productDescription, productCategory, productBrand, productManufracturer, unitOfMeasure, costPrice, sellingprice } = req.body;

  const newProduct = new Product({
    productId, 
    productName, 
    productDescription, 
    productCategory, 
    productBrand, 
    productManufracturer, 
    unitOfMeasure, 
    costPrice, 
    sellingprice
    
  });

  newProduct.save()
    .then((savedProduct) => {
      console.log('product saved:', savedProduct);
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Inventory Management System</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background-image: url('https://th.bing.com/th/id/OIP.Eg7O-ape2xSh2_Ed0-esxwHaGl?w=826&h=734&rs=1&pid=ImgDetMain');
                background-size: cover;
                display: flex; 
                align-items: center;
                justify-content: center;
                height: 100vh;
              }

              .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              h1 {
                color: #1e88e5;
              }

              .info-box {
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 15px;
                margin-top: 20px;
              }

              .info-box p {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Thank you for providing your information</h1>
              <div class="info-box">
                <p><strong>Product Id:</strong> ${productId}</p>
                <p><strong>Product Name:</strong> ${productName}</p>
                <p><strong>Product Description</strong> ${productDescription}</p>
                <p><strong>Product Category:</strong> ${productCategory}</p>
                <p><strong>Product Brand:</strong> ${productBrand}</p>
                <p><strong>Prodcut Manufracturer:</strong> ${productManufracturer}</p>
                <p><strong>Unit Of Measure:</strong> ${unitOfMeasure}</p>
                <p><strong>Cost Price:</strong> ${costPrice}</p>
                <p><strong>Selling Price:</strong> ${sellingprice}</p>
              </div>
            </div>
          </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error('Error saving products:', error);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Inventory Management System listening on port ${PORT}`);
}); 