## Sample project for OpenMeetings API using TypeScript

This project illustrates how to use the https://www.npmjs.com/package/openmeetings-node-client 
In order to integrate with https://openmeetings.apache.org/

This project is using TypeScript and exposes an API using the Express Framework.

If you looking for the JavaScript/ES6 version see: https://github.com/om-hosting/openmeetings-node-js-sample-project

## Use cases and setting up OpenMeetings

The plugin assumes you have an OpenMeetings Conference Server running.

You can find an example use case at https://om-hosting.com/openmeetings-integration-nodejs/

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
    // 1. Login to service
    const loginResult: ServiceResult = await userService.login("admin", "!HansHans").then(value => {
        return {
            // @ts-ignore
            message: value.data.serviceResult.message,
            // @ts-ignore
            type: value.data.serviceResult.type
        };
    }).catch(error => {
        console.log(error);
        return {
            message: 'Server Error',
            type: 'ERROR'
        };
    });
    if (loginResult.type !== 'SUCCESS') {
        res.send('Login failed, result: ' + JSON.stringify(loginResult))
        return
    }
    // 2. Generate Hash for entering a conference room
    const sessionId: string = loginResult.message;

    const hashResult: ServiceResult = await userService.getRoomHash(sessionId, {
        firstname: "John",
        lastname: "Doe",
        externalId: "uniqueId1",
        externalType: "myCMS",
        login: "john.doe",
        email: "john.doe@gmail.com"
    }, {
        roomId: 1,
        moderator: true
    }).then(value => {
        return {
            // @ts-ignore
            message: value.data.serviceResult.message,
            // @ts-ignore
            type: value.data.serviceResult.type
        };
    }).catch(error => {
        console.log(error.message);
        return {
            message: 'Server Error',
            type: 'ERROR'
        };
    });
    console.log("hashResult", hashResult);
    if (hashResult.type === "SUCCESS") {
        // 3. Construct Login URL
        const loginUrl: string = `${BASE_URL}/hash?secure=${hashResult.message}`
        res.send(`Click URL to login <a href="${loginUrl}">${loginUrl}`)
    } else {
        res.send("Error executing call" + hashResult.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
```

See also the code in /src/app.ts
