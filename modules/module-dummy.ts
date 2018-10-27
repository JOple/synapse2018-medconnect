import app from "../index";


app.get("/record/:id", (req, res) => {
    res.redirect("/login/", + req.param("id"))
})