import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { CreateUser, DeletetUser, GetMe, GetUsers, Login, UpdateUser } from "./usersApi"

const initialState = {
    user: null,
    isauth: false,
    autherror: {
      iserror: true,
      message: "",
    },
    authstatuss: "",
    users: [],
    deletestatus: "",
    datachanged: "",
  };

export const getusers = createAsyncThunk("users/find", async () => {
    const response = await GetUsers();
    return response.data;
  });


  export const deleteuser = createAsyncThunk("users/delete/id", async (id) => {
    const response = await DeletetUser(id);
    return response.data;
  });

  export const createuser = createAsyncThunk(
    "user/create",
    async (data) => {
      console.log(data);
      const response = await CreateUser(data);
      return response.data;
    }
  );
  


  export const login = createAsyncThunk("users/login", async (data) => {
    const response = await Login(data);
    return response.data;
  });


  export const getme = createAsyncThunk("users/me", async () => {
    const response = await GetMe();
    return response.data;
  });


  export const updateuser = createAsyncThunk("user/update/id", async (data) => {
    const response = await UpdateUser(data);
    return response.data;
  });



  export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      logout : (state,action) => {
        state.user = null
        state.isauth = false
        state.authstatuss = ""
        localStorage.clear()
        window.location.href = '/'    
      }
    },extraReducers: (builder) => {
        builder.addCase(getusers.fulfilled, (state, action) => {
            // Add user to the state array
            state.users = action.payload.data;
          });



          builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            // Add user to the state array
            if (action.payload) {
              //localStorage.setItem("token", action.payload.token);
              state.isauth = true;
              state.user = action.payload.user
              state.autherror.iserror = false;
              state.autherror.message = "";
              state.authstatuss = "success";
            } else {
              state.autherror.iserror = true;
              state.autherror.message = 'invalid credantials';
            }
          
          });

          





        }})

        export const { logout } = usersSlice.actions;
        export const selectautheduser = (state) => state.users.user;

  export const selectusers = (state) => state.users.users;
  export const selectdeletestatus = (state) => state.users.deletestatus;
  export const selectdatachanged = (state) => state.users.datachanged;

export const selectauthstatus = (state) => state.users.authstatuss;
export const selectautherror = (state) => state.users.autherror;
export const selectisauth = (state) => state.users.isauth;

  

  export default usersSlice.reducer;