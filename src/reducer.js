const initState={}


const reducer=(state=initState, action)=>{
    if (action.type==="FETCH_THREAD"){
        return action.payload
    }


    return state;
}

export default reducer;