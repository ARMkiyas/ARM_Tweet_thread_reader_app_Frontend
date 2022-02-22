const roClinet = require("./tweeter_client");
const express = require("express");
const cors = require("cors");

app = express();
app.use(express.json());
app.use(cors({
  origin:"*",
  methods:"GET,POST"
}))

const con=require("./Get_twitter_thread")


const port = process.env.PORT || 3001;

app.get("/api/data", async (req, res) => {
  console.log("started");
  try {
    const data = await tweet("1495089755285078022");
    res.send(JSON.stringify(data));
  } catch (e) {
    res.send("error");
  }
});

app.get("/", (req, res) => {
  res.send("Wellcome");
});

app.get("/api/getdata/:id", async (req, res) => {
  try {
    const data = await con(req.params.id);
    res.send(data);
  } catch (e) {
    res.send("error");
  }
});
app.listen(port, () => {
  console.log(`app is listening on port on ${port}`);
});
