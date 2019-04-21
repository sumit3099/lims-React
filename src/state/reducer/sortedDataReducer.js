const sortedDataReducer = ( state ={ name: 'sorteddata',
lastValues:[]
},action) => {
    if(action.type==="STORE_SORTED_DATA") {
        state = {
            search: action.payload
        }
    }
    return state;
}
export default sortedDataReducer;