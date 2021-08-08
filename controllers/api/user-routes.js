const router = require('express').Router();
const fs = require('fs');
const { User, Pet, CareDay } = require('../../models');

// GET /api/users
router.get('/', (req, res) =>
{
    User.findAll({
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
                        attributes: ['id', 'day_of_care', 'type_of_care']
                    }
                ]
            },
            {
                model: CareDay,
                as: 'sitting_days',
                attributes: ['id', 'day_of_care', 'type_of_care']
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
        },
        include: [
            {
                model: Pet,
                as: 'pets',
                attributes: ['id', 'pet_name'],
                include: [
                    {
                        model: CareDay,
                        as: 'requested_care_days',
                        attributes: ['id', 'day_of_care', 'type_of_care']
                    }
                ]
            },
            {
                model: CareDay,
                as: 'sitting_days',
                attributes: ['id', 'day_of_care', 'type_of_care']
            }
        ]
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
        .then(dbUserData => 
        {
            req.session.save(() =>
            {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.user_name;
                req.session.loggedIn = true;
    
                res.json({dbUserData});
            });
        })
        .catch(err =>
        {
            console.log(err);
            if (err.parent.code == "ER_DUP_ENTRY")
                res.status(401).json(err);
            else
                res.status(500).json(err);
        });
});

// POST /api/users/login
router.post('/login', (req, res) =>
{
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData =>
    {
        if (!dbUserData)
        {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword)
        {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() =>
        {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.user_name;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// POST /api/users/logout
router.post('/logout', (req, res) =>
{
    if (req.session.loggedIn)
    {
        req.session.destroy(() =>
        {
            res.status(204).end();
        });
    }
    else
    {
        res.status(404).end();
    }
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

router.post('/upload/:id', (req, res) =>
{
    //Check to see if any files were sent
    if (!req.files || Object.keys(req.files).length === 0) 
    {
        return res.status(400).send('No files were uploaded.');
    }

    //Create the upload path
    let profileFile = req.files.profileFile;
    let uploadPath = __dirname.replace("controllers\\api", "");
    uploadPath += `public\\uploads\\${req.params.id}\\`;

    //Remove the previous directory and pictures so we don't fill up the server
    fs.rmdir(uploadPath, { recursive:true }, (err) =>
    {
        if (err)
        {
            console.log(err);
            return res.status(500).send(err);
        }
        uploadPath += profileFile.name;

        // Save the picture
        profileFile.mv(uploadPath, function (err) 
        {
            if (err)
            {
                console.log(err);
                return res.status(500).send(err);
            }

            //Save the file name to the database
            User.update(
                {
                    profileFile: profileFile.name
                },
                {
                    where:
                    {
                        id: req.params.id
                    }
                })
                .then(dbUserData =>
                {
                    console.log(dbUserData);
                    if (!dbUserData[0])
                    {
                        res.status(404).json({ message: 'No user found with this id' });
                        return;
                    }
                    //Return to the profile page
                    res.redirect('/profile');
                })
                .catch(err =>
                {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    });

});

module.exports = router;