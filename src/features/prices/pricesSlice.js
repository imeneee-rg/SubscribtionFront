import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPrice } from "./pricesApi";
const initialState = {
    prices: [],
   
    addproductstatus: "",
  };


  export const getprice = createAsyncThunk("prices/findall", async (data) => {
    const response = await getPrice(data);
   // console.log("#####"+JSON.stringify(response));
    return response.data;
  });



  export const pricesSlice = createSlice({
    name: "prices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getprice.fulfilled, (state, action) => {
        state.prices = action.payload.data;
       
      })
}
  })
export const selectpricestatus = (state) => state.prices.prices;
export default pricesSlice.reducer;