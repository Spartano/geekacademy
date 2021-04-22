const express = require("express");
const router = express.Router();
const { randomBytes } = require("crypto");
const _ = require("lodash");

// variabile presente nella memoria del processo, se riavvio il server torna vuoto
const blogs = [];

router.get("/blogs", (req, res) => {
    res.render("index", 
    {   
        title: "Super Mario", 
        blogs,
    });
});

router.post("/blogs", (req, res) => {
    // proprietà aggiunta dal middleware express.urlencoded che raccoglie i dati dal form 
    const data = req.body;

    
    data.id = randomBytes(4).toString("hex");
    blogs.push(data);


    console.log(data);

    res.redirect("/blogs");
});

router.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Super Mario" });
});

// :id é un parametro della route (dinamicità)
router.get("/blogs/:id", (req, res) => {
    const id = req.params.id;

    const blog = blogs.find((blog) => blog.id === id);

    res.render("details", { blog, title: "Blog Details" });
});

router.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
   
    _.remove(blogs, function(blog) {
        return blog.id === id;
    });

    // rimando dei dati (object) al front-end che decide cosa fare
    res.json({ redirect: "/blogs"});
});


module.exports = router;