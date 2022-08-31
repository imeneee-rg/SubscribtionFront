import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Create, DeletetInscription, GetInscriptions, Update } from "./inscriptionsApi"

const initialState = {
   
   addinscriptionsstatus: "",
   inscriptions: [],
   clientinscriptions:[],
   deleteinscriptionsstatus: "",
  };

export const getinscriptions = createAsyncThunk("inscriptions/get", async () => {
    const response = await GetInscriptions();
    return response.data;
  });



  export const deleteinscription = createAsyncThunk("inscription/delete/id", async (id) => {
    const response = await DeletetInscription(id);
    return response.data;
  })



  export const updateinscription = createAsyncThunk("inscription/update/id", async (data) => {
    const response = await Update(data);
    return response.data;
  });


  export const createinscription = createAsyncThunk("inscription/create", async (data) => {
    const response = await Create(data);
    return response.data;
  });

  export const inscriptionsSlice = createSlice({
    name: "inscriptions",
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder.addCase(getinscriptions.fulfilled, (state, action) => {
            // Add user to the state array
            state.inscriptions = action.payload.data;
          });



          builder.addCase(updateinscription.pending, (state, action) => {
            console.log(action.payload);
            state.addstatus = "loading";
          });
      
          builder.addCase(updateinscription.fulfilled, (state, action) => {
            console.log(action.payload);
                  state.addstatus = "success";
      
          });



          builder.addCase(createinscription.pending, (state, action) => {
            console.log(action.payload);
            state.addinscriptionsstatus = "loading";
          });
      
          builder.addCase(createinscription.fulfilled, (state, action) => {
            console.log(action.payload);
            state.addinscriptionsstatus = "success";
          });
        }})

  
  export const selectaddinscriptionsstatus = (state) => state.inscriptions.selectaddinscriptionsstatus;
  export const selectinscriptions = (state) => state.inscriptions.inscriptions;
  export const deleteinscriptionsstatus=(state)=>state.inscriptions.deleteinscriptionsstatus;
  export const datainscriptionchanged=(state)=>state.inscriptions.addinscriptionsstatus;
  export const clientinscriptions= (state) => state.inscriptions.clientinscriptions;
  export default inscriptionsSlice.reducer;