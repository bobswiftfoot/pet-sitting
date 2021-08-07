const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// GET /api/posts
router.get('/', (req, res) =>
{
    Post.findAll(
        {
            include: [
                {
                    model: Comment,
                    attributes: ['comment_text'],
                    include: [
                        {
                            model: User,
                            attributes: ['user_name']
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/posts/1
router.get('/:id', (req, res) =>
{
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['comment_text'],
                include: [
                    {
                        model: User,
                        attributes: ['user_name']
                    }
                ]
            },
            {
                model: User,
                attributes: ['user_name']
            }
        ]
    })
        .then(dbPostData => 
        {
            if (!dbPostData)
            {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/posts
router.post('/', (req, res) =>
{
    /* expects 
    {
        title: 'New Post'
        post_url: 'Something@somthing.com'
        user_id: 1
        post_body: 'Lots of content'
    }*/
    Post.create(req.body)
        .then(dbPostData => res.json(dbPostData))
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/posts/1
router.put('/:id', (req, res) => 
{
    /* expects 
    {
        title: 'New Post'
        post_url: 'Something@somthing.com'
        user_id: 1
        post_body: 'Lots of content'
    }*/
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData =>
        {
            if (!dbPostData[0])
            {
                res.status(404).json({ dbPostData: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/posts/id
router.delete('/:id', (req, res) =>
{
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData =>
        {
            if (!dbPostData)
            {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;