import app from "../index"
import config from "../config";

import { personalAccounts, medicalAccounts } from "../db/accounts"
import { accessRights } from "../db/access-rights"

import uuidv4 = require('uuid/v4')


app.post("/personal_login", (req, res) => {
    let body;
    try {
        body = typeof req.body == "string" ? JSON.parse(req.body) : req.body
    } catch (e) {
        res.status(400).json({
            "error": "Bad Request"
        })
    }

    let username = body.username
    let password = body.password
    let resourceId = body.resourceId

    if (!username || !password) {
        res.status(403).json({
            "error": "Invalid username or password"
        })
        return
    }
    if (!resourceId) {
        res.status(403).json({
            "error": "Invalid requested resource"
        })
        return
    }

    let account = personalAccounts[username]

    if (!account) {
        res.status(403).json({
            "error": "Invalid username or password"
        })
        return
    }
    if (password != account.password) {
        res.status(403).json({
            "error": "Invalid username or password"
        })
        return
    }

    let accessKey = uuidv4();
    accessRights[accessKey] = new Set(account.resources)

    res.json({
        accessKey: accessKey
    })
})
app.post("/medical_login", (req, res) => {
    let body;
    try {
        body = typeof req.body == "string" ? JSON.parse(req.body) : req.body
    } catch (e) {
        res.status(400).json({
            "error": "Bad Request"
        })
    }

    let username = body.username
    let password = body.password
    let resourceId = body.resourceId

    if (!username || !password) {
        res.status(403).json({
            "error": "Invalid username or password"
        })
        return
    }
    if (!resourceId) {
        res.status(403).json({
            "error": "Invalid requested resource"
        })
        return
    }

    let account = medicalAccounts[username]

    if (!account) {
        res.status(403).json({
            "error": "Invalid username or password"
        })
        return
    }
    if (password != account.password) {
        res.status(403).json({
            "error": "Invalid username or password"
        })
        return
    }

    let accessKey = uuidv4();
    accessRights[accessKey] = new Set([...account.resources, resourceId])

    res.json({
        accessKey: accessKey
    })
})

app.get("/records/:id", (req, res) => {
    let id = req.param("id")

    if (!id) {
        res.redirect("/invalid_url")
        return
    }

    let accessKey = req.header(config.allowRecordAccessHeader)
    let allowedRecords = accessRights[accessKey]

    if (!allowedRecords || allowedRecords.size == 0) {
        res.redirect("/login/" + id)
        return
    }
    res.redirect("");
    // TODO: Show records
})
app.get("/login/:id", (req, res) => {

    // TODO: Show login, make sure login has access to config.allowRecordAccessHeader
})
app.get("/invalid_url", (req, res) => {

    // TODO: Create 404 page
})
app.get("*", (req, res) => {
    res.redirect("/invalid_url")
})