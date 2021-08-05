const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) =>
{
    res.render('homepage');
});

router.get('/login', (req, res) =>
{
    res.render('login');
});

router.get('/profile', (req, res) =>
{
    res.render('profile');
});

router.get('/calendar', (req, res) =>
{
    res.render('calendar');
});

module.exports = router;