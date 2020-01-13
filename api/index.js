const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 3001;
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('Github');
    console.log(JSON.parse(jobs).length);

    return res.send(jobs);
})

app.listen(port, () => console.log("example app listening on port", port));