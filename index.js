const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT)

const MusicClient = require("./struct/client.js");
const client = new MusicClient({});
