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

    const tweet_info = await await get_tweet_info(id);

    await roClinet.v2.search(
      `conversation_id:${tweet_info.data[0].conversation_id} from:${tweet_info.data[0].author_id}`,
      {
        max_results: 100,
        "tweet.fields": "author_id,in_reply_to_user_id,withheld,public_metrics",
        expansions: "attachments.media_keys",
        "media.fields": "url",
      }
    ).then(({data})=>{
      final_data.data = data?.data?.filter((obj) => {
        return obj.in_reply_to_user_id == obj.author_id;
      });
      data?.includes?.media?.map(obj =>{
        final_data.includes.push(obj)
      })
    })


 

    

    final_data.data === undefined ? final_data.data=(tweet_info.data) :   final_data.data?.push(tweet_info.data[0]);
  
    
    tweet_info?.includes?.media?.[0] ? final_data?.includes?.push(tweet_info.includes?.media?.[0]) : [];
    

    //  get.data?.data?.push(tweet_info.data.includes.media);
    //  get.data?.includes?.media.push()
    // // console.log(get.data?.data?.reverse());
    // get.data.data.reverse()
    // get.data.includes.media.reverse()
    final_data.data.reverse();
    final_data.includes.reverse();

    return final_data;
  
  } catch (e) {
    return tweet_info?.[0]
  }
};

module.exports=get_con;