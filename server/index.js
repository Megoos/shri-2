const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const dateDiff = require('./utils/dateDiff');

const port = 8000;
const types = ['info', 'critical'];
const _path = './events.json';

app.get('/status', (request, response) => {
    response.send(dateDiff(process.uptime()));
});

app.get('/api/events', (request, response, next) => {
    readFileAsync(path.join(__dirname, _path), { encoding: 'utf8' })
        .then(data => {
            let result = JSON.parse(data).events;
            console.log(request.query.type);
            //Если в запросе переданы параметры
            if (typeof request.query.type !== 'undefined') {
                if (typeof request.query.type !== 'string') {
                    return response.status(400).send('incorrect type');
                }

                const queryTypes = request.query.type.split(':');

                //проверка соответсвуют ли переданные параметры доступным
                for (let index = 0; index < queryTypes.length; index++) {
                    if (!types.includes(queryTypes[index])) {
                        return response.status(400).send('incorrect type');
                    }
                }

                result = result.filter(item => queryTypes.includes(item.type));
            }

            response.json({ events: result });
        })
        .catch(err => {
            next(err);
        });
});

app.use((request, response) => {
    response
        .type('text/html')
        .status(404)
        .send('<h1>Page not found</h1>');
});

app.use((err, request, response) => {
    response.status(500).send(err.message);
});

app.listen(port, err => {
    if (err) {
        return console.log('[Error]: ', err);
    }

    console.log('server is listening on', port);
});
