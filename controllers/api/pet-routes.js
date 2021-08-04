const router = require('express').Router();
const { Pet } = require('../../models');

// GET /api/pets
router.get('/', (req, res) =>
{
    //TODO: Get all Pets from database    
});

// GET /api/pets/1
router.get('/:id', (req, res) =>
{
    //TODO: GET 1 pet by Id
});

// POST /api/pets
router.post('/', (req, res) =>
{
    //TODO: Create a pet
});

// PUT /api/pets/1
router.put('/:id', (req, res) => 
{
    //TODO: Update pet info
});

// DELETE /api/pets/id
router.delete('/:id', (req, res) =>
{
    //TODO: Delete pet
});

module.exports = router;