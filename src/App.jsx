import { useState, Component } from "react";
import "./App.css";
import axios from "axios";
import Seacrh_bar from "./components/search_bar";
import Thread_screen from "./components/thread_screen";
import { Divider, Button } from "antd";
import { connect } from "react-redux";
import Pdf_gen from "./components/pdf_gen";
import pdf from "@react-pdf/renderer";

const { PDFDownloadLink } = pdf;

class App extends Component {
  state = {
    loading_state: false,
    search_value: "",
  };

  onsearch_bar = (e) => {
    this.setState({ search_value: e.target.value });
  };

  render() {
    console.log(this.props.getData)
    return (
      <div
        className={
          Object.keys(this.props.getData).length == 0 ? "root" : " root  "
        }
      >
        <Seacrh_bar />

        {Object.keys(this.props.getData).length == 0 ? (
          []
        ) : (
          <div>
            <Divider /> <Thread_screen />{" "}
          </div>
        )}
        <div>
        <Divider />
          {Object.keys(this.props.getData).length == 0 ? (
            []
          ) : (
            <div >
              <PDFDownloadLink
                document={<Pdf_gen getData={this.props.getData} />}
                fileName={this.props.getData.author_info.username}
              >
                {({ blob, url, loading, error }) =>
        loading ? <Button className="pdf_gen_btn" type="primary">Genarating PDF......</Button> : <Button className="pdf_gen_btn" type="primary">Download as PDF</Button>
      }
            
               
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getData: state,
  };
};

export default connect(mapStateToProps)(App);
