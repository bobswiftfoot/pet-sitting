const router = require('express').Router();
const { User, Pet, CareDay } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) =>
{
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) =>
{
    if (req.session.loggedIn)
    {
        res.redirect('/');
        return;
    }

    res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/profile', withAuth, (req, res) =>
{
    User.findAll({
        where: {
            id: req.session.user_id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Pet,
                as: 'pets',
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
            res.render('profile', { user, loggedIn: req.session.loggedIn });
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/calendar', withAuth, (req, res) =>
{
    CareDay.findAll({
        include: [
            {
                model: Pet,
                as: 'requested_care_days',
                attributes: ['id'],
                include:
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'user_name', 'email']
                }
            },
            {
                model: User,
                as: 'sitting_days',
                attributes: ['id', 'user_name', 'email']
            }
        ]
    })
        .then(dbCareDayData => 
        {
            const caredays = dbCareDayData.map(careDay => careDay.get({ plain: true }));
            res.render('calendar', { caredays, loggedIn: req.session.loggedIn });
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;