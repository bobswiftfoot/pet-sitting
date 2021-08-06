const router = require('express').Router();
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
                    attributes: ['id']
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

// POST /api/pets
router.post('/', (req, res) =>
{
    /* expects 
    {
        pet_name: 'doggie', 
        user_id: 1 
    }*/
    Pet.create(req.body)
        .then(dbPetData => res.json(dbPetData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
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