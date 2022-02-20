import { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {

  getdata=()=>{
    axios.get("http", (res)=>{

    })
  }

  render() {
    return <div className="App">hallo</div>;
  }
}

export default App;
