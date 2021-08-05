const router = require('express').Router();
const { CareDay } = require('../../models');

// GET /api/caredays
router.get('/', (req, res) =>
{
    //TODO: Get all caredays from database    
});

// GET /api/caredays/1
router.get('/:id', (req, res) =>
{
    //TODO: GET 1 careday by Id
});

// POST /api/caredays
router.post('/', (req, res) =>
{
    //TODO: Create a careday
});

// PUT /api/caredays/1
router.put('/:id', (req, res) => 
{
    //TODO: Update careday info
});

// DELETE /api/caredays/id
router.delete('/:id', (req, res) =>
{
    //TODO: Delete careday
});

module.exports = router;