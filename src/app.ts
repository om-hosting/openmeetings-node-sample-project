const express = require('express')
const app = express()
const port = 3000

import {UserServiceApi, Configuration} from "openmeetings-node-client"

const config: Configuration = new Configuration({
    basePath: "http://localhost:5080/openmeetings/services"
})

app.get('/', async (req, res) => {
    const userService: UserServiceApi = new UserServiceApi(config);
    const { data } = await userService.login("admin", "!HansHans")
    res.send('Login result: ' + data + JSON.stringify(data))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
