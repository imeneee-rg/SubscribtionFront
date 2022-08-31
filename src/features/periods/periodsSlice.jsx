import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Create, GetPeriods } from "./periodsApi";

const initialState = {
    periods: [],
   
    addstatus: "",
  };


  export const getperiods = createAsyncThunk("periods/findall", async () => {
    const response = await GetPeriods();
    return response.data;
  });


  export const createperiods = createAsyncThunk(
    "periods/create",
    async (data) => {
      console.log(data);
      const response = await Create(data);
      return response.data;
    }
  );

  export const productsSlice = createSlice({
    name: "periods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        
        builder.addCase(getperiods.fulfilled, (state, action) => {
            console.log(action.payload);
            state.periods = action.payload.data;
            
          })


          builder.addCase(createperiods.pending, (state, action) => {
            console.log(action.payload);
            state.addstatus = "loading";
          });
           builder.addCase(createperiods.fulfilled, (state, action) => {
            console.log(action.payload);
            state.addstatus = "success";
          });
        }
    })
export const selectperiodstatus = (state) => state.periods.periods;
export default productsSlice.reducer;