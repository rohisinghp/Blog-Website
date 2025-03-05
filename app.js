require('dotenv').config();


const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectionDB = require('./server/config/db.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Connect database
connectionDB()

app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/main.js'));
app.use('/',require('./server/routes/admin.js'));


app.listen(PORT,()=>{
    console.log(`App is listing at PORT : ${PORT}`)
}) 