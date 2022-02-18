const roClinet = require("./tweeter_client");

const tweet = async () => {
  try {
// const tweet=await roClinet.v2.tweets("1492418987107442689",{"tweet.fields":"author_id,attachments,conversation_id"})
    const get=await roClinet.v2.search("conversation_id:1492418987107442689 from:7847192",{max_results:100, "tweet.fields":"in_reply_to_user_id,attachments","media.fields":"preview_image_url"})
    console.log(get.data);
  } catch (e) {
    console.log(e);
  }
};

tweet();