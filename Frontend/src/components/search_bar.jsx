import { useState } from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import {get_data} from "../actions/search_action"

const { Search } = Input;

const seacrh_bar = (props) => {
  const [loading_state, toggle_loading] = useState(false);

  const [search_value, setValue] = useState("");
  const onsearch_bar = (e) => {
    setValue(e.target.value);
  };

  // onserach
  const get_data=()=>{
    search_value>2 ? props.fetch_data(search_value) : console.log("error")
  }
 
  return (
    <div className="search_bar">
      <Search
        placeholder="Enter thread link"
        size="large"
        enterButton
        loading={loading_state}
        value={search_value}
        onChange={onsearch_bar}
        onSearch={get_data}
      />
    </div>
  );
};

const mapStateToProps=(state)=>{
    return{}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        fetch_data:(id)=>dispatch(get_data(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(seacrh_bar);
