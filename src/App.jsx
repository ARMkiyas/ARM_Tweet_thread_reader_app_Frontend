import { useState, Component } from "react";
import "./App.css";
import axios from "axios";
import Seacrh_bar from "./components/search_bar";
import Thread_screen from "./components/thread_screen";
import {Divider} from "antd";
import {connect} from "react-redux";



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
      <div className={Object.keys(this.props.getData).length == 0 ? "root" : " root  "}>
        <Seacrh_bar/>

        {Object.keys(this.props.getData).length == 0 ? []:<div><Divider/> <Thread_screen/></div>}
      
      

   
        
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
      getData:state
  }
}

export default  connect(mapStateToProps)(App);
