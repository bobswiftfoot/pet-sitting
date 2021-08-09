const router = require('express').Router();
const { CareDay, Pet, User } = require('../../models');

// GET /api/caredays
router.get('/', (req, res) =>
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
        .then(dbCareDayData => res.json(dbCareDayData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/caredays/1
router.get('/:id', (req, res) =>
{
    CareDay.findOne({
        where: {
            id: req.params.id
        },
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
            if (!dbCareDayData)
            {
                res.status(404).json({ message: 'No care day found with this id' });
                return;
            }
            res.json(dbCareDayData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/caredays
router.post('/', (req, res) =>
{
    /* expects 
    {
        pet_id: 1
    }*/
    CareDay.create(req.body)
        .then(() => res.redirect('/calendar'))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/caredays/1
router.put('/:id', (req, res) => 
{
    /* expects 
    {
        pet_id: 1
    }*/
    CareDay.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbCareDayData =>
        {
            if (!dbCareDayData[0])
            {
                res.status(404).json({ message: 'No care day found with this id' });
                return;
            }
            res.json(dbCareDayData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/caredays/id
router.delete('/:id', (req, res) =>
{
    CareDay.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCareDayData =>
        {
            if (!dbCareDayData)
            {
                res.status(404).json({ message: 'No care day found with this id' });
                return;
            }
            res.json(dbCareDayData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;