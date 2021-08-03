const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) =>
{
    //TODO: Get all Users from database    
});

// GET /api/users/1
router.get('/:id', (req, res) =>
{
    //TODO: GET 1 user by Id
});

// POST /api/users
router.post('/', (req, res) =>
{
    //TODO: Create a user
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
    //TODO: Update User info
});

// DELETE /api/users/id
router.delete('/:id', (req, res) =>
{
    //TODO: Delete USER
});

module.exports = router;