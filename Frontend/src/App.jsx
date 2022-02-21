import { useState, Component } from "react";
import "./App.css";
import axios from "axios";
import Seacrh_bar from "./components/search_bar";

class App extends Component {

    state={
      loading_state:false,
      search_value:""

    }
  

    
    onsearch_bar=(e)=>{
      this.setState({search_value:e.target.value})
    }

  render() {
    return (
      <div className="root">
        <Seacrh_bar></Seacrh_bar>
      </div>
    );
  }
}

export default App;
