import { useState } from "react";
import { Input, message } from "antd";
import { connect } from "react-redux";
import { get_data } from "../actions/search_action";


const { Search } = Input;

const seacrh_bar = (props) => {
  const [loading_state, toggle_loading] = useState(false);
  const [model, model_toggle] = useState(false);
  const [search_value, setValue] = useState("");

  const onsearch_bar = (e) => {
    setValue(e.target.value);
    if (e.target.value.length > 19) {
      model_toggle(false);
    }
  };

  const url = (url) => {
    const url_sp = url.split("/");
    if (
      url_sp.includes("twitter.com") &&
      !isNaN(url_sp[url_sp.length - 1]) &&
      url_sp[url_sp.length - 1].length >= 19
    ) {
      return [true, url_sp[url_sp.length - 1]];
    }
    return [false, 0];
  };

  // onserach
  const fetch_tweet =  () => {
    const valid_url = url(search_value);
    
    valid_url[0]
      ? props.fetch_data(valid_url[1], toggle_loading)
      : model_toggle(true);
  };

  return (
    <div className="search_bar">
      <Search
        placeholder="Enter thread link"
        size="large"
        enterButton
        loading={loading_state}
        value={search_value}
        onChange={onsearch_bar}
        onSearch={fetch_tweet}
      />
      {!model ? <div className="note">Note:- Please Enter Recent Thread or Tweet link(last 7 days) </div> : []}
      {model ? <div className="error">Please Enter Valid Twitter Thread or tweet URL</div> : []}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetch_data: (id, loading) => dispatch(get_data(id, loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(seacrh_bar);
