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
index_1.default.get("/register/done", (req, res) => {
    res.render("register_done");
});
index_1.default.get("/data-privacy", (req, res) => {
    res.render("data-privacy");
});
index_1.default.get("/terms-and-conditions", (req, res) => {
    res.render("terms-and-conditions");
});
index_1.default.get("*", (req, res) => {
    res.redirect("/login/" + "sadkhasd");
});
