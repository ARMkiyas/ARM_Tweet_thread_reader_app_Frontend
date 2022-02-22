import ReactDOM from 'react-dom';
import { Modal, Button, Space } from 'antd';

const model=()=>{
    return ReactDOM.createPortal(
       <div>
          {error()}
       </div>
  

    ,  document.getElementById("model"));
}

function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }

export default model