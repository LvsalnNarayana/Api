import express, { urlencoded } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { sessionMiddleware } from './utils/SessionMiddleware.js';

var app = express();
var server = createServer(app);

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(sessionMiddleware);

app.use(urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    console.log(req.headers);
    req.session.user = "this is a test user";
    req.session.save();
    res.status(200).json({ "hello": "hello" });
});

export default server;
