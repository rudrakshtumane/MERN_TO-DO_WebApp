const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
// const categoryRoutes = require('./routes/categoryRoutes');
// const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const fs = require('fs');
const path = require('path');



const app = express();
const port = 5001;  


// Check if 'uploads' folder exists, and create it if it doesn't
// if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
//     fs.mkdirSync(path.join(__dirname, 'uploads'));
//   }

app.use(bodyParser.json());
app.use(express.json());

// database connection
mongoose.connect("mongodb://localhost:27017/TO-DO_WebApp" );  

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
});



app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/user',userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/Categories', categoryRoutes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})  
