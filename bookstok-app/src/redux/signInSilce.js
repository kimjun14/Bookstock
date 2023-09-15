import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name : 'signInApp',
  initialState: {
    signInList : [],
    currentList : { logIn : []}
  },
  reducers:{
    signInArticle(state, action){
      state.signInList = action.payload.list;
    }
  }

});

export default signInSlice;
export const {signInArticle} = signInSlice.action;