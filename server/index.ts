const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const dateDiff = require('./utils/dateDiff');
import { Router, Request, Response, NextFunction } from 'express';

const port = 8000;
const types = ['info', 'critical'];
const _path = './events.json';

interface Item { [key: string]: string;}

app.get('/status', (request: Request, response: Response) => {
  response.send(dateDiff(process.uptime()));
});

app.get('/api/events', (request: Request, response: Response, next: NextFunction) => {
  readFileAsync(path.join(__dirname, _path), { encoding: 'utf8' })
    .then((data: string) => {
      let result = JSON.parse(data).events;
      // Если в запросе переданы параметры
      if (typeof request.query.type !== 'undefined') {
        if (typeof request.query.type !== 'string') {
          return response.status(400).send('incorrect type');
        }

        const queryTypes: Array<string> = request.query.type.split(':');

        // проверка соответсвуют ли переданные параметры доступным
        for (let index = 0; index < queryTypes.length; index++) {
          if (!types.some((type) => type === queryTypes[index])) {
            return response.status(400).send('incorrect type');
          }
        }

        result = result.filter((item: Item) => queryTypes.some((type) => type === item.type));
      }

      response.json({ events: result });
    })
    .catch((err: Error) => {
      next(err);
    });
});

app.use((request: Request, response: Response) => {
  response
    .type('text/html')
    .status(404)
    .send('<h1>Page not found</h1>');
});

app.use((err: Error, request: Request, response: Response) => {
  response.status(500).send(err.message);
});

app.listen(port, (err: Error) => {
  if (err) {
    return console.log('[Error]: ', err);
  }

  console.log('server is listening on', port);
});
