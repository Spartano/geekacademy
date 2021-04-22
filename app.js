const express = require("express");
const morgan = require("morgan");

const app = express();

const blogRoutes = require("./routes/blogRoutes");

app.listen(3000, () => {
    console.log("Sto girando sulla porta 3000!");
});

// register view engine
app.set("view engine", "ejs");

// metodo nativo di express, é un middleware
// i dati che mandiamo con un form sono encoded nell'URL dal client
// questo middleware prende i dati dall'urlencoded
app.use(express.urlencoded({ extended: true}));

/*
Middleware casalinghi
app.use((req, res, next) => {
    console.log("sono prima della route");
    // authentication
    // se non é autenticato res.redirect
    next();
});

app.use((req, res, next) => {
    console.log("sono secondo della route");
    next();
});
*/

app.use(express.static("public")); // 

app.use(morgan("dev"));

/*
nuova route 
*/
app.get('/', (req, res) => {
    //res.sendFile('./views/index.html'); senza ejs template
    res.redirect("/blogs");
    
    /*res.render("index", { title: "Super Mario", 
    blogs: 
    [{
        title: "Mario",
        snippet: "Il più grande"
    },
    {
        title: "Luigi",
        // se mancasse una qualche proprietà, non viene scatenata un'eccezione, ma semplicemente non viene messa
        snippet: "suo fratello"
    }]
 }); // guarda di default nella cartella views e prende il file con il nome che passo come argomento*/
});

const clienti = [1, 2, 3];
app.get("/customers", (req, res) => {
    res.json({ clienti });
});

app.post("/customers", (req, res) => {
    const data = req.body;
    clienti.push(data);

    res.json({ clienti });
});

app.use(blogRoutes);


app.get("/about", (req, res) => {
    res.render("about", { title: "Super Mario" });
});

// 404 page: equivale al default dello switch (nel server classico)
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});