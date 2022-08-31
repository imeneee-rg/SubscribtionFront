import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Create, DeletetProduct, GetAll, getalllproducts, Update } from "./productsApi";

const initialState = {
    products: [],
    filtredproducts: [],
    addstatus: "",
  };

  
  //craete product
  export const createproduct = createAsyncThunk(
    "products/create",
    async (data) => {
      console.log(data);
      const response = await Create(data);
      return response.data;
    }
  );

  export const getproducts = createAsyncThunk("products/findall", async () => {
    const response = await getalllproducts();
    return response.data;
  });


  export const deleteproduct = createAsyncThunk("users/delete/id", async (id) => {
    const response = await DeletetProduct(id);
    return response.data;
  });


  export const updateproducts = createAsyncThunk("product/update/id", async (data) => {
    const response = await Update(data);
    return response.data;
  });


export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    filterprice : (state,action) => {

      const price = Number(action.payload.price)

      if (action.payload.price === "") {
        state.filtredproducts = state.products;
      } else {
        let arr = [...state.products];

        let data = arr.filter((p) => p.price <= price);

        state.filtredproducts = data;
      }
    }

  },



  extraReducers: (builder) => {
    builder.addCase(createproduct.pending, (state, action) => {
      console.log(action.payload);
      state.addstatus = "loading";
    });
     builder.addCase(createproduct.fulfilled, (state, action) => {
      console.log(action.payload);
      state.addstatus = "success";
    });

    builder.addCase(getproducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products = action.payload.data;
        state.filtredproducts = action.payload.data;
      })
}
})


export const { filtrecategory, filtername, filterprice } = productsSlice.actions;

export const selectproducts = (state) => state.products.filtredproducts;
export const selectaddstatus = (state) => state.products.addstatus;
export const selectstatus = (state) => state.products.products;
export default productsSlice.reducer;