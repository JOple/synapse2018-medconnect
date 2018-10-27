"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
index_1.default.get("/record/:id", (req, res) => {
    res.render("record", {
        id: req.param("id"),
        patient: {
            name: "Maynard C. Si",
            pic: "/img/pogingthesismate.jpg"
        },
        canEdit: true
    });
});
index_1.default.get("/login/:id", (req, res) => {
    res.render("login", {
        id: req.param("id")
    });
});
index_1.default.get("/records/:id", (req, res) => {
    res.render("record", {
        id: req.param("id"),
        patient: {
            name: "Maynard C. Si",
            pic: "/img/pogingthesismate.jpg"
        },
        canEdit: false
    });
});
index_1.default.get("/register", (req, res) => {
    res.render("register");
});
index_1.default.get("*", (req, res) => {
    res.redirect("/login/" + "sadkhasd");
});
