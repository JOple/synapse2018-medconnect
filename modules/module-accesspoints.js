"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const config_1 = require("../config");
const accounts_1 = require("../db/accounts");
const access_rights_1 = require("../db/access-rights");
const uuidv4 = require("uuid/v4");
index_1.default.post("/personal_login", (req, res) => {
    let body;
    try {
        body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
    }
    catch (e) {
        res.status(400).json({
            "error": "Bad Request"
        });
    }
    let username = body.username;
    let password = body.password;
    let resourceId = body.resourceId;
    if (!username || !password) {
        res.status(403).json({
            "error": "Invalid username or password"
        });
        return;
    }
    if (!resourceId) {
        res.status(403).json({
            "error": "Invalid requested resource"
        });
        return;
    }
    let account = accounts_1.personalAccounts[username];
    if (!account) {
        res.status(403).json({
            "error": "Invalid username or password"
        });
        return;
    }
    if (password != account.password) {
        res.status(403).json({
            "error": "Invalid username or password"
        });
        return;
    }
    let accessKey = uuidv4();
    access_rights_1.accessRights[accessKey] = new Set(account.resources);
    res.json({
        accessKey: accessKey
    });
});
index_1.default.post("/medical_login", (req, res) => {
    let body;
    try {
        body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
    }
    catch (e) {
        res.status(400).json({
            "error": "Bad Request"
        });
    }
    let username = body.username;
    let password = body.password;
    let resourceId = body.resourceId;
    if (!username || !password) {
        res.status(403).json({
            "error": "Invalid username or password"
        });
        return;
    }
    if (!resourceId) {
        res.status(403).json({
            "error": "Invalid requested resource"
        });
        return;
    }
    let account = accounts_1.medicalAccounts[username];
    if (!account) {
        res.status(403).json({
            "error": "Invalid username or password"
        });
        return;
    }
    if (password != account.password) {
        res.status(403).json({
            "error": "Invalid username or password"
        });
        return;
    }
    let accessKey = uuidv4();
    access_rights_1.accessRights[accessKey] = new Set([...account.resources, resourceId]);
    res.json({
        accessKey: accessKey
    });
});
index_1.default.get("/records/:id", (req, res) => {
    let id = req.param("id");
    if (!id) {
        res.redirect("/invalid_url");
        return;
    }
    let accessKey = req.header(config_1.default.allowRecordAccessHeader);
    let allowedRecords = access_rights_1.accessRights[accessKey];
    if (!allowedRecords || allowedRecords.size == 0) {
        res.redirect("/login/" + id);
        return;
    }
    res.redirect("");
    // TODO: Show records
});
index_1.default.get("/login/:id", (req, res) => {
    // TODO: Show login, make sure login has access to config.allowRecordAccessHeader
});
index_1.default.get("/invalid_url", (req, res) => {
    // TODO: Create 404 page
});
index_1.default.get("*", (req, res) => {
    res.redirect("/invalid_url");
});
