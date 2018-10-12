const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const dateDiff = require('./utils/dateDiff');

var startTime = null;
const port = 8000;
const types = ['info', 'critical'];
const _path = './events.json';

app.get('/status', (request, response) => {
    response.send(dateDiff(startTime, new Date()));
});

app.get('/api/events', (request, response) => {
    fs.readFile(path.join(__dirname, _path) , 'utf-8', (err, data) => {
        try {
            if (err) {
                throw err.message;
            }

            var result = JSON.parse(data).events;

            //Если в запросе переданы параметры
            if (typeof request.query['type'] !== 'undefined') {
                const queryTypes = request.query.type.split(':');

                //проверка соответсвуют ли переданные параметры доступным
                for (let index = 0; index < queryTypes.length; index++) {
                    if (!types.includes(queryTypes[index])) {
                        response.status(400).send('incorrect type');
                        return;
                    }
                }

                result = result.filter(item => queryTypes.includes(item.type));
            }

            response.json({ events: result });
        } catch (e) {
            response.status(500).send(e);
        }
    });
});

app.get('*', (request, response) => {
    response.status(404).send('<h1>Page not found</h1>');
});

app.use((err, request, response, next) => {
    response.status(500).send('Error:', err);
});

app.listen(port, err => {
    if (err) {
        return console.log('[Error]: ', err);
    }

    startTime = new Date();
    console.log('server is listening on', port);
});
