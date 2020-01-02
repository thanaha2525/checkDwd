const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");
const checkRouter = require("./routes/check");
const session = require("express-session");

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(homeRouter);
app.use(authRouter);
app.use(checkRouter);
const PORT = process.env.port || 3003;
app.listen(PORT, function(err) {
  if (!err) {
    console.log(`App Listen in http://localhost:${PORT}`);
  } else {
    console.log(`Can't Listen in http://localhost:${PORT} err ${err}`);
  }
});
