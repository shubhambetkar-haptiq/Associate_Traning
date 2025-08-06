import  {createSlice} from '@reduxjs/toolkit';
const initialState = {
    searchTerm:'',

};
const SearchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setSearchTerm:(state,action)=>{
            state.searchTerm = action.payload;
        }
    }
})
export const {setSearchTerm} = SearchSlice.actions;
export default SearchSlice.reducer;