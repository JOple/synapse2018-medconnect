import app from "../index";


app.get("/record/:id", (req, res) => {
    res.redirect("/login/", + req.param("id"))
})
app.get("/login/:id", (req, res) => {
    res.render("login", {
        id: req.param("id")
    })
})
app.get("/records/:id", (req, res) => {

})

app.get("*", (req, res) => {
    res.send("Sorry 404 page is here<br>Go to /login/:id to test functionality")
})