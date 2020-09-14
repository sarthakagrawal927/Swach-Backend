const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    }),
  );
}
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello there");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
