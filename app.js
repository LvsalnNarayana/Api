import express, { urlencoded } from 'express';
import { createServer } from 'http';
import cors from 'cors';

var app = express();
var server = createServer({ rejectUnauthorized: false }, app);
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.status(200).json({ "hello": "hello" });
});

export default server;
