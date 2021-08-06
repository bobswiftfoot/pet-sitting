const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) =>
{
    res.render('homepage',{ loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) =>
{
    if (req.session.loggedIn)
    {
        res.redirect('/');
        return;
    }

    res.render('login',{ loggedIn: req.session.loggedIn });
});

router.get('/profile', (req, res) =>
{
    if (!req.session.loggedIn)
    {
        res.redirect('/');
        return;
    }

    res.render('profile', { loggedIn: req.session.loggedIn });
});

router.get('/calendar', (req, res) =>
{
    if (!req.session.loggedIn)
    {
        res.redirect('/');
        return;
    }

    res.render('calendar' ,{ loggedIn: req.session.loggedIn });
});

module.exports = router;