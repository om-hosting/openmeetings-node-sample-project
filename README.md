## Sample project for OpenMeetings API

This project illustrates how to use the https://www.npmjs.com/package/openmeetings-node-client 
In order to integrate with https://openmeetings.apache.org/

This project is using TypeScript and exposes an API using the Express Framework

## Running this project

```bash
npm run build && npm run start
```

Open a browser and go to http://localhost:3000

If you host user/password are correct it will display
```json
Login result: {"serviceResult":{"message":"4835c9c5-1b58-491b-9bee-903879c96048","type":"SUCCESS"}}
```

To configure the WebService hostname and login/password modify:
```typescript
const config: Configuration = new Configuration({
    basePath: "http://localhost:5080/openmeetings/services"
})

//and later
const { data } = await userService.login("admin", "!HansHans")
```
See /src/app.ts

## Sample project code

TypeScript example:
```bash
npm install openmeetings-node-client
```

In your project TypeScript file, eg assuming you are using the Express framework:
```javascript
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
```

See also the code in /src/app.ts
