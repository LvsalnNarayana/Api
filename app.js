import express, { urlencoded } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { sessionMiddleware } from './utils/SessionMiddleware.js';
import { store } from './utils/SessionMiddleware.js';

var app = express();
var server = createServer(app);

app.use(cors({
    origin: 'https://api-tester-48e59.web.app',
    credentials: true,
}));

app.use(sessionMiddleware);

app.use(urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'https://api-tester-48e59.web.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });
app.get('/', (req, res, next) => {
    console.log(req.headers);
    req.session.user = "this is a test user";
    req.session.save();
    let data_test;
    store.get(req.sessionID, (err, data) => {
        data_test = data;
    })
    res.status(200).json({ "hello": req.cookies, "hello2": req.sessionID, "hello3" : data_test , "hello4" : req.session});
});

export default server;
