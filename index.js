const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    }),
  );
}

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/org", require("./routes/org"));
app.use("/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.send("Hello there");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
