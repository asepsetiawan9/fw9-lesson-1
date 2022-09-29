import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../helpers/http";
import qs from 'qs';

export const postContact = createAsyncThunk('/contact', async request => {
    const result = {};
    try {
      const send = qs.stringify(request);
      const {data} = await http().post(
        '/contact',
        send,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );
      result.data = data.result;
      result.successMsg = data.message;
      console.log('ini pesannya', data.message);
      return result;
    } catch (e) {
      result.errorMsg = e.response.data.message;
      return result;
    }
  });

  export const getContactById = createAsyncThunk(
    'contact/detail-data',
    async request => {
      const result = {};
      try {
        const {data} = await http().get(`/contact/detail-data/${request}`);
        return data;
      } catch (e) {
        result.message = e.response.data?.message;
        return result;
      }
    },
  );

  export const getAllContact = createAsyncThunk('contact/get-data', async({limit, page, search})=>{
    limit = parseInt(limit) || 5
    page  = parseInt(page) || 1
    search = search || ''
    const query = new URLSearchParams({limit, page, search}).toString()
    const {data} = await http().get(`/contact/get-data?${query}`)
    return data
  });

  export const deleteData = createAsyncThunk('contact/delete', async({id, cb})=>{
    // const id_data = id;
    console.log('ini id yang mau di delete', id);
    const {data} = await http().delete(`/contact/delete/${id}`)
    // console.log('ini datanya', data);
    cb()
    return 0
  });


  export const editContact = createAsyncThunk('/contact/edit', async ({id, dataEdit}) => {
    const result = {};
    console.log('ini dari edit', id);
    try {
      const send = qs.stringify(dataEdit);
      const {data} = await http().patch(
        `/contact/edit/${id}`,
        send,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );
      result.data = data.result;
      result.successMsg = data.message;
      return result;
    } catch (e) {
      result.errorMsg = e.response.data.message;
      return result;
    }
  });

