import {createSlice} from '@reduxjs/toolkit';
import {getAllContact, postContact, getContactById} from '../asyncAction/contact';

const initialState = {
  deleteModal: false,
  data: {},
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
    build.addCase(getContactById.fulfilled, (state, action) => {
        state.dataContact = action.payload.result;
    });
    build.addCase(getAllContact.fulfilled, (state, action) => {
      state.tabel = action.payload.result;
      state.tabelInfo = action.payload.infoPage
  });
  },
});

export {postContact};
export const {selectContact, toggleModal} = contact.actions;
export default contact.reducer;

