const router = require('express').Router();
const { User, Pet, CareDay } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/profile', withAuth, (req, res) =>
{   
    User.findOne({
        where: {
            user_id: req.session.user_id
        }, 
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Pet,
                attributes: ['id', 'pet_name'],
                include: [
                    {
                        model: CareDay,
                        as: 'requested_care_days',
                        attributes: ['id']
                    }
                ]
            },
            {
                model: CareDay,
                as: 'sitting_days',
                attributes: ['id']
            }
        ]
    })
    .then(dbUserData =>
    {
        const user = dbUserData.map(user => user.get({ plain: true }));
        console.log(user);
        res.render('profile', { user, loggedIn: req.session.loggedIn });
    });
});

router.get('/calendar', withAuth, (req, res) =>
{
    res.render('calendar' ,{ loggedIn: req.session.loggedIn });
});

module.exports = router;