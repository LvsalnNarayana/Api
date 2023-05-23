import express, { urlencoded } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { sessionMiddleware } from './utils/SessionMiddleware';

var app = express();
var server = createServer({ rejectUnauthorized: false }, app);

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(sessionMiddleware);

app.use(urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    req.session.user = null;
    req.session.save();
    res.status(200).json({ "hello": "hello" });
});

export default server;
