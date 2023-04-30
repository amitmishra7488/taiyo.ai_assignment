const express= require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app= express();
app.use(express.json());
const contactRoutes = require('./routes/contact.routes')
app.use(cors())

app.use('/contact', contactRoutes);


connectDB()
app.listen(8080,()=>{
    console.log('listening on 8080');
})