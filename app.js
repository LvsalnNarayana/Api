import express, { urlencoded } from "express";
import { createServer } from "http";
import { sessionMiddleware } from "./utils/SessionMiddleware.js";
import { store } from "./utils/SessionMiddleware.js";

var app = express();

var server = createServer(app);

app.use(sessionMiddleware);

app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  req.session.user = "this is a test user";
  req.session.save();
  store.get(req.sessionID, (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.status(200).send({ message: "this is a success message" });
  });
});

export default server;
