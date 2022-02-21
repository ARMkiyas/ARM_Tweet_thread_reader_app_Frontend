const roClinet = require("./tweeter_client");

const get_tweet_info = async (id) => {
  const data = await roClinet.v2.tweets(id, {
    "tweet.fields": "author_id,conversation_id",
    expansions: "attachments.media_keys",
    "media.fields": "url",
  });

  return data;
};

const get_con = async (id) => {
  try {
    // const tweet=await roClinet.v2.tweets("1492418987107442689",{"tweet.fields":"author_id,attachments,conversation_id"})
    const final_data = {
      data: [],
      includes: [],
    };
    console.log("started");
    const tweet_info = await await get_tweet_info(id);
    console.log(tweet_info);
    const get = await roClinet.v2.search(
      `conversation_id:${tweet_info.data[0].conversation_id} from:${tweet_info.data[0].author_id}`,
      {
        max_results: 100,
        "tweet.fields": "author_id,in_reply_to_user_id,withheld,public_metrics",
        expansions: "attachments.media_keys",
        "media.fields": "url",
      }
    );

    final_data.data = get.data.data.filter((obj) => {
      return obj.in_reply_to_user_id == obj.author_id;
    });
    final_data.includes.push(get.data.includes?.media);

    final_data.data?.push(tweet_info.data[0]);
    final_data.includes.push(tweet_info.includes?.media);

    //  get.data?.data?.push(tweet_info.data.includes.media);
    //  get.data?.includes?.media.push()
    // // console.log(get.data?.data?.reverse());
    // get.data.data.reverse()
    // get.data.includes.media.reverse()
    final_data.data.reverse();
    final_data.includes.reverse();
    return final_data;
  } catch (e) {
    console.log(e);
  }
};

module.exports=get_con;