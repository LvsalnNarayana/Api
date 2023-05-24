import express, { urlencoded } from "express";
import cors from "cors";
import { createServer } from "http";
import { sessionMiddleware } from "./utils/SessionMiddleware.js";
import { store } from "./utils/SessionMiddleware.js";

var app = express();
var server = createServer(app);

app.use(
  cors({
    // origin: "https://api-tester-48e59.web.app",
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(sessionMiddleware);

app.use(urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  req.session.user = "this is a test user";
  req.session.save();
  let data_test;
  store.get(req.sessionID, (err, data) => {
    data_test = data;
  });
  res.setHeader('Set-Cookie', 'myCookie=example-value; Path=/; Secure;');
  res
    .status(200)
    .json({
      "request headers": req.headers,
      "cookies": req.cookies,
      "sessionId": req.sessionID,
      "session data": data_test,
      "session request": req.session,
    });
});

export default server;
