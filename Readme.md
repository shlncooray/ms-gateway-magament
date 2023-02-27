# MS-Gateway Management REST API Suite
##### _By Shelan Leonardo Cooray - shlncooray@gmail.com_

### Development Assumptions
- Gateway can create without a device (peripheral device) using a POST request to __/gateway__ endpoint
- Device (peripheral device) can create with or without gateway (by providing gateway ID) using a POST request to __/device__
- New/existing device/s can add/remove to a Gateway using a PATCH request to __/gateway__ endpoint

### Prerequisite

 - Docker to be installed in your environment. This .Dockerfile and docker-compose.yml build, ran and tested on a MacOS(M1) Monterey environment

### Build & Installation
MS-Gateway will run on a [Node.js](https://nodejs.org/) v19+ environment and [MongoDb](https://www.mongodb.com/) v6+.

In order to build and run the MS-Gateway, navigate to project root folder and execute the below command in your cmd/terminal

```sh
docker compose up
```

This will build both NodeJS and MongoDB environment.

After Successfull build you could be able to see NodeJS REST API endpoints are running on your http://localhost:4000/ and MongoDB is running on your mongodb://localhost:2717
- If both 4000 and 2717 are already occupied just change the host ports on docker-compose.yml

### RUN API Test suite
After you can succefully access the http://localhost:4000/, run below command to run the API test suite and few unit tests

```sh
npm test
```

### Manually check/execute REST API Endpoints
- If you are using VSCode to open the project go to project root, go to inside __rest-apis__ folder
- There are two seperate .http files for which contain sample REST API calls for each and every endpoint
```sh
    - device-rest.http
    - gateway-rest.http
```
- In order to execute those APIs calls via VSCode itself, you just need to install the [REST Clinet](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- Then you should able to simply see the _Send Request_ command on each top of REST API call like below
![alt text](https://i.ibb.co/3skX4KZ/Screenshot-2023-02-22-at-21-33-41.png)
- Or simply run above endpoints and sample request via __Postman__

### Optional - RUN and execute code on your local machine without docker
- Makesure to install both [Node.js](https://nodejs.org/) v19+ environment and [MongoDb](https://www.mongodb.com/) v6+.
- Then navigate to project root and excute
```sh
npm install
```
- Then in order to start the project in development mode just execute below command,
```sh
npm run dev
```
- If you want to run Test suite just execute, 
```sh
npm test
```
- If you want to access APIs just use the above mentioned __"Manually check REST API Endpoints"__ using VSCode Rest Client (.http files) or Postman
