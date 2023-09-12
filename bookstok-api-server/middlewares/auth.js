function checkAuth(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.status(401).send('Please log in');
    }
};

// Example route that requires authentication
app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.send('Welcome to your dashboard');
});

module.exports = checkAuth;