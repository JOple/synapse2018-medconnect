import * as express from "express"
import uuidv4 = require('uuid/v4')

import { config } from "./config";
import { personalAccounts, medicalAccounts } from "./db/accounts";

export const server = express()

interface AccessRights {
    [key: string]: Set<string>
}

const cache: AccessRights = {}

server.post("/personal_login", (req, res) => {
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
    cache[accessKey] = new Set(account.resources)

    res.json({
        accessKey: accessKey
    })
})
server.post("/medical_login", (req, res) => {
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
    cache[accessKey] = new Set(account.resources)

    res.json({
        accessKey: accessKey
    })
})

server.get("/records/:id", (req, res) => {
    let id = req.param("id")

    if (!id) {
        res.redirect("/invalid_url")
        return
    }

    let accessKey = req.header(config.allowRecordAccessHeader)
    let allowedRecords = cache[accessKey]

    if (!allowedRecords) {
        res.redirect("/login/" + id)
        return
    }
})
server.get("/login/:id", (req, res) => {

})
server.get("/invalid_url", (req, res) => {

})
server.get("*", (req, res) => {
    res.redirect("/invalid_url")
})