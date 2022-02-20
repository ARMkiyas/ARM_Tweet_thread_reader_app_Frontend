const roClinet = require("./tweeter_client");
const express = require("express");
var cors = require('cors')


app = express();
app.use(express.json(),cors({
  "origin": "127.0.0.1",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));


const get_tweet_info = async (id) => {
  const data = await roClinet.v2.tweets(id, {
    "tweet.fields": "author_id,conversation_id",
  });

  return data?.data?.[0];
};

const tweet = async (id) => {
  try {
    // const tweet=await roClinet.v2.tweets("1492418987107442689",{"tweet.fields":"author_id,attachments,conversation_id"})
    console.log("started");
    tweet_info = await get_tweet_info(id);

    const get = await roClinet.v2.search(
      `conversation_id:${tweet_info.conversation_id} from:${tweet_info.author_id}`,
      { max_results: 100, "tweet.fields": "author_id,in_reply_to_user_id,source" ,"media.fields":"url,preview_image_url"}
    );
    get.data?.data?.push(tweet_info);
    console.log(get.data?.data?.reverse());
    return get.data?.data?.reverse();
  } catch (e) {
    console.log(e);
  }
};

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
    const data = await tweet(req.params.id);
    res.send(data);
  } catch (e) {
    res.send("error");
  }
});
app.listen(port, () => {
  console.log(`app is listening on port on ${port}`);
});