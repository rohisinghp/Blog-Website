require('dotenv').config();


const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const methodOverride = require('method-override')


const connectionDB = require('./server/config/db.js');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),

}))

app.use(express.static('public'));

//Connect database
connectionDB()

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main.js'));
app.use('/', require('./server/routes/admin.js'));
app.use('/', require('./server/routes/register.js'))


app.listen(PORT, () => {
    console.log(`App is listing at PORT : ${PORT}`)
}) 