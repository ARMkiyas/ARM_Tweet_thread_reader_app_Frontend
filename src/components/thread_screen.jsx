
import { Card } from "antd";



const thread_screen = (props) => {
console.log(props)
  const screen = () => {
    return (
      <div className="thread_screen">
        <Card className="screen_card">
          {props?.getData?.data?.map((tweets) => {
              
            let media_data = {};
            media_data = tweets?.attachments
              ? props?.getData?.includes?.find((media) => {
                  if (media?.media_key == tweets?.attachments?.media_keys[0]) {
                    return media;
                  }
                })
              : {};
            return (
              <div key={tweets.id}>
                <p>{tweets.text}</p>
           
                {Object.keys(media_data).length >= 0 &&
                media_data.type !== "photo" ? (
                  []
                ) : (
                  <div className="image">
                    {" "}
                    <img src={media_data?.url} />
                  </div>
                )}
              </div>
            );
          })}

        </Card>
      </div>
    );
  };




 
  return (
      <div>
        {
            props.getData=="error" ? [] : screen()
        }
      </div>
    
  )
};



export default thread_screen;
