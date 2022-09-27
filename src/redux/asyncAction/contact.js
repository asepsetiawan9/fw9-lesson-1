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

  export const getData = createAsyncThunk('getData', async request =>{
    const result = {}
    try {
      const { data } = await http().get('/contact/get-data')
      return data
    } catch (error) {
      result.message = error.response.data?.message;
      return result
    }
  });