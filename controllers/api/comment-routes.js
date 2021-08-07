const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// GET /api/comments
router.get('/', (req, res) =>
{
    Comment.findAll(
        {
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                },
                {
                    model: Post,
                    attributes: ['post_id', 'title']
                }
            ]
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/comments/1
router.get('/:id', (req, res) =>
{
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['user_name']
            },
            {
                model: Post,
                attributes: ['post_id', 'title']
            }
        ]
    })
        .then(dbCommentData => 
        {
            if (!dbCommentData)
            {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/comments
router.post('/', (req, res) =>
{
    /* expects 
    {
        text: 'Something witty'
        user_id: 1
        post_id: 1
    }*/
    Comment.create(req.body)
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/comments/1
router.put('/:id', (req, res) => 
{
    /* expects 
    {
        text: 'Something witty'
        user_id: 1
        post_id: 1
    }*/
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData =>
        {
            if (!dbCommentData[0])
            {
                res.status(404).json({ dbCommentData: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/comments/id
router.delete('/:id', (req, res) =>
{
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData =>
        {
            if (!dbCommentData)
            {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;