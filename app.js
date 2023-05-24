import express, { urlencoded } from "express";
import cors from "cors";
import { createServer } from "http";
import { sessionMiddleware } from "./utils/SessionMiddleware.js";
import { store } from "./utils/SessionMiddleware.js";

var app = express();
var server = createServer(app);

app.use(
  cors({
    origin: "https://api-tester-48e59.web.app",
    credentials: true,
  })
);

app.use(sessionMiddleware);

app.use(urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  req.session.user = "this is a test user";
  req.session.save();
  store.get(req.sessionID, (err, data) => {
    if (err) {
      // Handle error appropriately
      console.error(err);
      return res.sendStatus(500);
    }
    res.setHeader('Access-Control-Allow-Origin', 'https://api-tester-48e59.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
    res.cookie('myCookie', 'example-value', {
      path: '/',
      secure: false,
      sameSite: 'none',
      httpOnly: false
    });
    res.status(200).json({
      "request headers": req.headers,
      "cookies": req.cookies,
      "sessionId": req.sessionID,
      "session data": data,
      "session request": req.session,
    });
  });
});

export default server;
