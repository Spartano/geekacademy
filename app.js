const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Sto girando sulla porta 3000!");
});

// register view engine
app.set("view engine", "ejs");

/*
nuova route 
*/
app.get('/', (req, res) => {
    //res.sendFile('./views/index.html'); senza ejs template
    res.render("index", { title: "Super Mario", 
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
 }); // guarda di default nella cartella views e prende il file con il nome che passo come argomento
});


app.get("/about", (req, res) => {
    res.render("about", { title: "Super Mario" });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Super Mario" });
});

// 404 page: equivale al default dello switch (nel server classico)
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});