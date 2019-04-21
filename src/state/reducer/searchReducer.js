const searchReducer = ( state ={ name: 'chaitanya',
lastValues:[]
},action) => {
    if(action.type==="STORE_SEARCH") {
        state = {
            search: action.payload
        }
    }
    else if(action.type === "STORE_SORTED_DATA")
    {
        state = {
            sorted_Data: action.payload
        }
    }
    return state;
}
export default searchReducer;