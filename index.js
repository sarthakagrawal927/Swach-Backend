const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    }),
  );
}

app.use("/org/login", require("./routes/org/login"));
app.use("/org/register", require("./routes/org/register"));
app.use("/org/posts", require("./routes/org/posts"));

app.use("/user/login", require("./routes/user/login"));
app.use("/user/register", require("./routes/user/register"));
app.use("/user/posts", require("./routes/user/posts"));

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.get("/org", (req, res) => {
  res.send("Discover Garbage in your area.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
