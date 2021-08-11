const router = require('express').Router();
const fs = require('fs');
const { Pet, CareDay, User } = require('../../models');

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
router.post('/', (req, res) =>
{
    /* expects 
    {
        pet_name: 'doggie', 
        user_id: 1 
    }*/
    //Check to see if any files were sent
    if (!req.files || Object.keys(req.files).length === 0) 
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
        Pet.create({
            user_id: req.body.user_id,
            pet_name: req.body.pet_name,
            pet_animal: req.body.pet_animal,
            pet_breed: req.body.pet_breed,
            picture_file_name: req.files.picture_file_name.name
        })
            .then(dbPetData =>
            {
                //Create the upload path
                let picture_file_name = req.files.picture_file_name;
                let uploadPath = __dirname.replace("controllers\\api", "");
                uploadPath += `public\\uploads\\pets\\${dbPetData.dataValues.id}\\`;

                //Remove the previous directory and pictures so we don't fill up the server
                fs.rmdir(uploadPath, { recursive: true }, (err) =>
                {
                    if (err)
                    {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    uploadPath += picture_file_name.name;

                    // Save the picture
                    picture_file_name.mv(uploadPath, function (err) 
                    {
                        if (err)
                        {
                            console.log(err);
                            return res.status(500).send(err);
                        }
                        //Save the file name to the database
                        Pet.update(
                            {
                                picture_file_name: picture_file_name.name
                            },
                            {
                                where:
                                {
                                    id: dbPetData.dataValues.id
                                }
                            })
                            .then(dbPetData =>
                            {
                                console.log(dbPetData);
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
            })
            .catch(err =>
            {

                console.log(err);
                res.status(500).json(err);
            });
    }
});

// POST /api/pets/edit
router.post('/edit/:id', (req, res) =>
{
    //Check to see if any files were sent
    if (!req.files || Object.keys(req.files).length === 0) 
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
        Pet.update({
            user_id: req.body.user_id,
            pet_name: req.body.pet_name,
            pet_animal: req.body.pet_animal,
            pet_breed: req.body.pet_breed,
            picture_file_name: req.files.picture_file_name.name
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(dbPetData =>
            {
                //Create the upload path
                let picture_file_name = req.files.picture_file_name;
                let uploadPath = __dirname.replace("controllers\\api", "");
                uploadPath += `public\\uploads\\pets\\${req.params.id}\\`;

                //Remove the previous directory and pictures so we don't fill up the server
                fs.rmdir(uploadPath, { recursive: true }, (err) =>
                {
                    if (err)
                    {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    uploadPath += picture_file_name.name;

                    // Save the picture
                    picture_file_name.mv(uploadPath, function (err) 
                    {
                        if (err)
                        {
                            console.log(err);
                            return res.status(500).send(err);
                        }
                        //Save the file name to the database
                        Pet.update(
                            {
                                picture_file_name: picture_file_name.name
                            },
                            {
                                where:
                                {
                                    id: req.params.id
                                }
                            })
                            .then(dbPetData =>
                            {
                                console.log(dbPetData);
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