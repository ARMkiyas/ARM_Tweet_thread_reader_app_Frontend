import axios from "axios"


export const get_data=(id , loading)=>{
    loading(true)       
  return (dispatch)=>{
     axios.get(``).then(({data})=>{
            loading(false)
        
            return dispatch({type:"FETCH_THREAD", payload:data})
        })
    }
}



