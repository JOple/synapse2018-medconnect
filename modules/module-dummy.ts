import app from "../index";


app.get("/record/:id", (req, res) => {
    res.render("record", {
        id: req.param("id"),
        patient: {
            name: "Maynard C. Si",
            pic: "/img/pogingthesismate.jpg"
        }
    })
})
app.get("/login/:id", (req, res) => {
    res.render("login", {
        id: req.param("id")
    })
})
app.get("/records/:id", (req, res) => {

})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("*", (req, res) => {
    res.redirect("/login/" + "sadkhasd")
})