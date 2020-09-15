const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const loginRouter = require("./routes/login");
const regRouter = require("./routes/register");
const orgRouter = require("./routes/org");
const postRouter = require("./routes/posts");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
}

app.use("/login", loginRouter);
app.use("/register", regRouter);
app.use("/org", orgRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello there");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
