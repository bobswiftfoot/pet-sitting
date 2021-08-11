const router = require("express").Router();
const { User, Pet, CareDay, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", (req, res) =>
{
    res.render("homepage", { loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) =>
{
    if (req.session.loggedIn)
    {
        res.redirect("/");
        return;
    }

    res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/profile", withAuth, (req, res) =>
{
    User.findAll({
        where: {
            id: req.session.user_id,
        },
        attributes: { exclude: ["password"] },
        include: [
            {
                model: Pet,
                as: "pets",
                attributes: [
                    "id",
                    "pet_name",
                    "pet_animal",
                    "pet_breed",
                    "picture_file_name",
                    "user_id"
                ],
                include: [
                    {
                        model: CareDay,
                        as: "requested_care_days",
                        attributes: ["id"],
                    },
                ],
            },
            {
                model: CareDay,
                as: "sitting_days",
                attributes: ["id"],
            },
        ],
    })
        .then((dbUserData) =>
        {
            const user = dbUserData.map((user) => user.get({ plain: true }))[0];
            res.render("profile", { user, loggedIn: req.session.loggedIn });
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/calendar", withAuth, (req, res) =>
{
    CareDay.findAll({
        order: [["day_of_care", "ASC"]],
        include: [
            {
                model: Pet,
                as: "requested_care_days",
                attributes: ["id", "pet_name"],
                include: {
                    model: User,
                    as: "owner",
                    attributes: ["id", "user_name", "email"],
                },
            },
            {
                model: User,
                as: "sitting_days",
                attributes: ["id", "user_name", "email"],
            },
        ],
    })
        .then((dbCareDayData) =>
        {
            User.findAll({
                where: {
                    id: req.session.user_id,
                },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: Pet,
                        as: "pets",
                        attributes: ["id", "pet_name", "pet_animal", "pet_breed"],
                    },
                ],
            }).then((dbUserData) =>
            {
                const user = dbUserData.map((user) => user.get({ plain: true }))[0];

                const caredays = dbCareDayData.map((careday) =>
                    careday.get({ plain: true })
                );
                res.render("calendar", {
                    caredays,
                    user,
                    loggedIn: req.session.loggedIn,
                });
            });
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/edit-post/:id", withAuth, (req, res) =>
{
    Post.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ["comment_text", "createdAt"],
                include: [
                    {
                        model: User,
                        attributes: ["user_name"],
                    },
                ],
            },
            {
                model: User,
                attributes: ["user_name"],
            },
        ],
    })
        .then((dbPostData) =>
        {
            const post = dbPostData.map((post) => post.get({ plain: true }))[0];
            res.render("edit-post", { post, loggedIn: req.session.loggedIn });
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/posts/:id", withAuth, (req, res) =>
{
    Post.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ["comment_text", "createdAt"],
                include: [
                    {
                        model: User,
                        attributes: ["user_name"],
                    },
                ],
            },
            {
                model: User,
                attributes: ["user_name"],
            },
        ],
    })
        .then((dbPostData) =>
        {
            const post = dbPostData.map((post) => post.get({ plain: true }))[0];
            res.render("single-post", { post, loggedIn: req.session.loggedIn });
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/posts", withAuth, (req, res) =>
{
    Post.findAll({
        include: [
            {
                model: Comment,
                attributes: ["comment_text", "createdAt"],
                include: [
                    {
                        model: User,
                        attributes: ["user_name"],
                    },
                ],
            },
            {
                model: User,
                attributes: ["user_name"],
            },
        ],
    })
        .then((dbPostData) =>
        {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            res.render("posts", { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
