"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var promisify = require('util').promisify;
var readFileAsync = promisify(fs.readFile);
var dateDiff = require('./utils/dateDiff');
var port = 8000;
var types = ['info', 'critical'];
var _path = './events.json';
app.get('/status', function (request, response) {
    response.send(dateDiff(process.uptime()));
});
app.get('/api/events', function (request, response, next) {
    readFileAsync(path.join(__dirname, _path), { encoding: 'utf8' })
        .then(function (data) {
        var result = JSON.parse(data).events;
        // Если в запросе переданы параметры
        if (typeof request.query.type !== 'undefined') {
            if (typeof request.query.type !== 'string') {
                return response.status(400).send('incorrect type');
            }
            var queryTypes_1 = request.query.type.split(':');
            var _loop_1 = function (index) {
                if (!types.some(function (type) { return type === queryTypes_1[index]; })) {
                    return { value: response.status(400).send('incorrect type') };
                }
            };
            // проверка соответсвуют ли переданные параметры доступным
            for (var index = 0; index < queryTypes_1.length; index++) {
                var state_1 = _loop_1(index);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            result = result.filter(function (item) { return queryTypes_1.some(function (type) { return type === item.type; }); });
        }
        response.json({ events: result });
    })
        .catch(function (err) {
        next(err);
    });
});
app.use(function (request, response) {
    response
        .type('text/html')
        .status(404)
        .send('<h1>Page not found</h1>');
});
app.use(function (err, request, response) {
    response.status(500).send(err.message);
});
app.listen(port, function (err) {
    if (err) {
        return console.log('[Error]: ', err);
    }
    console.log('server is listening on', port);
});
