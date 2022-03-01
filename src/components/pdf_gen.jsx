import React from "react";
import pdf from "@react-pdf/renderer";
import { connect } from "react-redux";

const { Page, Text, Image, Document, View, StyleSheet,Font } = pdf;


const PDFFile = (props) => {
  
  Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });
  
  console.log(props.getData);
  props?.getData?.data?.map((tweets) => {
    let tw = tweets.text;

    console.log(tw.replace(/\n/g, ""));
  });
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Roboto'
    },text_img:{
      margin: 0,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Roboto'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
      width: "500px",
      height: "250px",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
  console.log(props.getData);

  return (
    <Document>
      <Page style={styles.body}>
        <View>
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
                <Text style={styles.text}>
                  {" "}
                  {tweets.text.replace(/\n/g, "")}     </Text>
                <Text style={styles.text}>
                {Object.keys(media_data).length >= 0 &&
                  media_data.type !== "photo" ? (
                    ""
                  ) : (
     
                    <Image style={styles.image} src={media_data?.url} />
                  )}
                </Text>
                  
           
              </div>
            );
          })}
        </View>

        {/* <div>
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
                <Text>{tweets.text}</Text>
                {Object.keys(media_data).length >= 0 &&
                media_data.type !== "photo" ? (
                  ""
                ) : (
                  <View>
                    <Image style={styles.image} source={media_data?.url} />
                  </View>
                )}
              </div>
            );
          })}

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </div> */}
                <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed />
      </Page>
    </Document>
  );
};

export default PDFFile;
