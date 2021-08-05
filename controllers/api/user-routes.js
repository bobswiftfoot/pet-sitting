const router = require('express').Router();
const { User, Pet, CareDay } = require('../../models');

// GET /api/users
router.get('/', (req, res) =>
{
    User.findAll({
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
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) =>
{
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => 
        {
            if (!dbUserData)
            {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
// Used in signup
router.post('/', (req, res) =>
{
    /* expects 
    {
        user_name: 'username', 
        email: 'email@email.com', 
        password: 'password1234'
    }*/
    User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users/login
router.post('/login', (req, res) =>
{
    //TODO: Login
});

// POST /api/users/logout
router.post('/logout', (req, res) =>
{
    //TODO: Logout
});

// PUT /api/users/1
router.put('/:id', (req, res) =>
{
    /* expects 
    {
        user_name: 'username', 
        email: 'email@email.com', 
        password: 'password1234'
    }*/
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData =>
        {
            if (!dbUserData[0])
            {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/id
router.delete('/:id', (req, res) =>
{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData =>
        {
            if (!dbUserData)
            {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;