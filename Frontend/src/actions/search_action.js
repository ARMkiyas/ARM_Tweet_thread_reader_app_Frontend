import axios from "axios"


export const get_data=(id)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:8080/api/getdata/${id}`).then((data)=>{
            return dispatch({type:"FETCH_THREAD", payload:data})
        })
    }
}