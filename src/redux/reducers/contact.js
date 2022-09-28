import {createSlice} from '@reduxjs/toolkit';
import {postContact} from '../asyncAction/contact';
import {getContactById} from '../asyncAction/contact';

const initialState = {
  data: {},
  dataContact: {},
  dataDetail: {},
  errorMsg: null,
  successMsg: null,
};

const contact = createSlice({
  name: 'contact',
  initialState,
  reducers: {
      selectContact: (state, action) => {
      state.dataDetail.id = action.payload;
    },
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

    build.addCase(getContactById.fulfilled, (state, action) => {
      state.dataContact = action.payload.result;
    });
  },
});

export {postContact};
export const {selectContact} = contact.actions;
export default contact.reducer;

