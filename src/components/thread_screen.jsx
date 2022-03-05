import { useEffect } from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import { pdf } from "@react-pdf/renderer";


const thread_screen = (props) => {

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

const mapStateToProps = (state) => {
  return {
    getData: state,
  };
};

export default connect(mapStateToProps)(thread_screen);
