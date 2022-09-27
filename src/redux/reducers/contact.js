import {createSlice} from '@reduxjs/toolkit';
import {postContact} from '../asyncAction/contact';
import {getData} from '../asyncAction/contact';

const initialState = {
  data: {},
  dataContact: {},
  errorMsg: null,
  successMsg: null
};

const contact = createSlice({
  name: 'contact',
  initialState,
  reducers: {
   
  },
  extraReducers: build => {
    build.addCase(postContact.pending, (state) => {
        state.errorMsg = null;
        state.successMsg = null;
      });
    build.addCase(postContact.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.errorMsg = action.payload?.errorMsg;
        state.successMsg = action.payload?.successMsg;
    });
    build.addCase(getData.fulfilled, (state, action) => {
        state.dataContact = action.payload;
      });
  },
});

export {getData};
export {postContact};
export default contact.reducer;

