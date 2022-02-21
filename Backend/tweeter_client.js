const {TwitterApi}  = require("twitter-api-v2");
require("dotenv").config()


const twaccess= new TwitterApi({
    appKey:process.env.APP_KEY,
    appSecret:process.env.APP_SECRET,
    accessToken:process.env.ACCESS_TOKEN,
    accessSecret:process.env.ACCESS_SECRET,

});


const oClient=new TwitterApi(process.env.BEARER_TOKEN)

const roClinet=twaccess.readOnly;

module.exports = roClinet;

