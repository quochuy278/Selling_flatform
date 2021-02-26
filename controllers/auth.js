const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    //  .get('Cookie')
    //  .trim()
    //  .split('=')[1]
     res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
         isAuthenticated: false
     });
};

exports.postLogin = (req,res,next) => {
    User.findById('6038d518e2460528bc096aad')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
   .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
   req.session.destroy((err) => {
       console.log(err)
       res.redirect('/')
   })
}