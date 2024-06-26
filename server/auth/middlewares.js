const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) { // Предполагая, что вы используете Passport.js для аутентификации
        return next();
    }
    res.redirect('/log');
};


module.exports = {
    isAuth
};
