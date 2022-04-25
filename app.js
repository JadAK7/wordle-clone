import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("styling"));
app.use(express.static("js"));

app.get("/normal-game", (req, res) => {
  res.render("normal-game");
});

app.get("/backwards-game", (req, res) => {
  res.render("backwards-game");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Server running on port 3000!"));
