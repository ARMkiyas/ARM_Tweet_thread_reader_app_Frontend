import React from "react";
import pdf from "@react-pdf/renderer";
import { connect } from "react-redux";

const { Page, Text, Image, Document, View, Svg, Line, StyleSheet, Font } = pdf;
let date=new Date();

const PDFFile = (props) => {
  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
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
      textAlign: "justify",
      fontFamily: "Roboto",
    },
    text_img: {
      margin: 0,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Roboto",
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
    cre_date: {
      display: "flex",
      alignSelf: "flex-end",
      fontSize: 12,
      margin: 4,
    },
    line: {
      x1: "1000", //starting coords are x1 and y1
      y1: "0",
      x2: "0", //ending coords:
      y2: "0",
      strokeWidth: 2,
      stroke: "rgb(219, 219, 219)",

      //stroke color
    },
    author_view: {
      margin: 10,
      alignSelf: "center",
    },
    author: {
      fontSize: 14,
      marginTop: 4,
    },
    head: {
      display: "flex",
      flexDirection: "row",
    },
    pro_image: {
      width: 80,
    },
  });
  console.log(props.getData);
  console.log(props?.getData?.data?.length);
  const arr_len=props?.getData?.data?.length;
  if(arr_len%2==0 && arr_len>1){
    const col=arr_len/2;
  }else if(arr_len>1){
    const col={
      "1st":((arr_len-1)/2) + 1,
      "2nd":(arr_len-1)/2
    }
  }else{
    const col=1
  }
  return (
    <Document>
      <Page style={styles.body}>
        <View fixed>
          <View style={styles.head}>
            <Image
              style={styles.pro_image}
              src={props.getData.author_info.profile_image_url.replace("_normal","")}
            />
            <View style={styles.author_view}>
              <Text style={styles.author}>Thread Author: {props.getData.author_info.name}</Text>

              <Text style={styles.author}>Publication Data: {props.getData.created_at.split("T")[0]}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.cre_date}>Created at {
             date.toLocaleString()
            }</Text>
          </View>

          <Svg width={"100%"} height={"10"}>
            <Line style={styles.line} />
          </Svg>
        </View>
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
                  {tweets.text.replace(/\n/g, "")}{" "}
                </Text>
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
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFFile;
