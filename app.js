const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URL = 'mongodb+srv://HuyBui:FdQJp4MtHYefN9E@cluster0.dgjac.mongodb.net/myFirstDatabase'

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'session'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'my secret', 
    resave: false, 
    saveUninitialized: false,
    store:store
}));

app.use((req, res, next) => {
    User.findById('6038d518e2460528bc096aad')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(
    MONGODB_URL
    )
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Huy',
                    email: 'huy@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })

        app.listen(3000);
    })