"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
index_1.default.get("/record/:id", (req, res) => {
    res.redirect("/login/", +req.param("id"));
});
index_1.default.get("/login/:id", (req, res) => {
    res.render("login", {
        id: req.param("id")
    });
});
index_1.default.get("/records/:id", (req, res) => {
});
index_1.default.get("*", (req, res) => {
    res.send("Sorry 404 page is here<br>Go to /login/:id to test functionality");
});
