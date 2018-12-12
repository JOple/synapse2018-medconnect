import * as express from "express"

import config from "./config";

export const app = express()
export default app

import "./modules/module-debug"
import "./modules/module-config"
import "./modules/module-dev"
// import "./modules/module-accesspoints"
import "./modules/module-dummy"

const port = config.port || 8080
app.listen(port, () => console.log("Server is online at " + port))