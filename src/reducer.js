const initState={}


const reducer=(state=initState, action)=>{
    if (action.type==="FETCH_THREAD"){
        return action.payload
    }

    console.log(state)
    return state;
}

export default reducer;