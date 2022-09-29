import {createSlice} from '@reduxjs/toolkit';
import {getAllContact, postContact, getContactById, editContact} from '../asyncAction/contact';

const initialState = {
  deleteModal: false,
  data: {},
  dataEdit: {},
  tabel: [],
  tabelInfo: {},
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
    toggleModal: (state)=>{
      state.deleteModal = !state.deleteModal;
    }
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
    build.addCase(editContact.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    });
  build.addCase(editContact.fulfilled, (state, action) => {
      state.dataEdit = action.payload.data;
      state.errorMsg = action.payload?.errorMsg;
      state.successMsg = action.payload?.successMsg;
  });
    build.addCase(getContactById.fulfilled, (state, action) => {
        state.dataContact = action.payload.result;
    });
    build.addCase(getAllContact.fulfilled, (state, action) => {
      state.tabel = action.payload.result;
      state.tabelInfo = action.payload.infoPage
  });
  },
});

export {postContact, editContact};
export const {selectContact, toggleModal} = contact.actions;
export default contact.reducer;

