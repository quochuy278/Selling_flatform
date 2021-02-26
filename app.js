const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { unsubscribe } = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findById('6038d518e2460528bc096aad')
    .then(user => {
        req.user =  user;
        next();
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://HuyBui:FdQJp4MtHYefN9E@cluster0.dgjac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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