const router = require('express').Router();
const fs = require('fs');
const { Pet, CareDay, User, File } = require('../../models');
const upload = require('../../config/multer.js');

// GET /api/pets
router.get('/', (req, res) =>
{
    Pet.findAll(
        {
            include: [
                {
                    model: CareDay,
                    as: 'requested_care_days',
                    attributes: ['id', 'day_of_care', 'type_of_care']
                },
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'user_name', 'email']
                }
            ]
        })
        .then(dbPetData => res.json(dbPetData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/pets/1
router.get('/:id', (req, res) =>
{
    Pet.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: CareDay,
                as: 'requested_care_days',
                attributes: ['id', 'day_of_care', 'type_of_care']
            },
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'user_name', 'email']
            }
        ]
    })
        .then(dbPetData => 
        {
            if (!dbPetData)
            {
                res.status(404).json({ message: 'No pet found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/pets
router.post('/', upload.single("picture_file_name"), (req, res) =>
{
    /* expects 
    {
        pet_name: 'doggie', 
        user_id: 1 
    }*/
    //Check to see if any files were sent
    if (!req.file || Object.keys(req.file).length === 0) 
    {
        //Quick create without any fileupload
        Pet.create(req.body)
            .then(dbPetData => res.redirect('/profile'))
            .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });
    }
    else
    {
        File.create(
            {
                type: req.file.mimetype,
                name: req.file.originalname,
                data: req.file.buffer
            })
            .then((dbFileData) => 
            {
                Pet.create({
                    user_id: req.body.user_id,
                    pet_name: req.body.pet_name,
                    pet_animal: req.body.pet_animal,
                    pet_breed: req.body.pet_breed,
                    profile_file_id: dbFileData.dataValues.id
                })
                .then(dbPetData =>
                {
                    //Return to the profile page
                    res.redirect('/profile');
                })
            })
            .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// POST /api/pets/edit
router.post('/edit/:id', upload.single("picture_file_name"), (req, res) =>
{
    //Check to see if any files were sent
    if (!req.file || Object.keys(req.file).length === 0) 
    {
        //Quick create without any fileupload
        Pet.update(req.body,{
            where: {
                id: req.params.id
            }
            })
            .then(dbPetData => res.redirect('/profile'))
            .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });
    }
    else
    {
        File.create(
            {
                type: req.file.mimetype,
                name: req.file.originalname,
                data: req.file.buffer
            })
            .then((dbFileData) => 
            {
                Pet.update({
                    user_id: req.body.user_id,
                    pet_name: req.body.pet_name,
                    pet_animal: req.body.pet_animal,
                    pet_breed: req.body.pet_breed,
                    profile_file_id: dbFileData.dataValues.id
                },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then(dbPetData =>
                {
                    //Return to the profile page
                    res.redirect('/profile');
                })
            })
            .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// PUT /api/pets/1
router.put('/:id', (req, res) => 
{
    /* expects 
    {
        pet_name: 'doggie', 
        user_id: 1 
    }*/
    Pet.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbPetData =>
        {
            if (!dbPetData[0])
            {
                res.status(404).json({ dbPetData: 'No pet found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/pets/id
router.delete('/:id', (req, res) =>
{
    Pet.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPetData =>
        {
            if (!dbPetData)
            {
                res.status(404).json({ message: 'No pet found with this id' });
                return;
            }
            res.json(dbPetData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;