import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_queues_add, api_queues_get, api_queues_get_list } from "./commonApi";
import { parser_queues_get, parser_queues_get_list } from "./commonParser";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
  queues_data_loading: false,
  add_loading: false,
  queues_data: [],
  unique_queues_data: null
};

export const queuesGetList = createAsyncThunk(
  "queuesGetList",
  async (payload) => {
    try {
      const response = await api_queues_get_list();
      const data = parser_queues_get_list(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const queuesAdd = createAsyncThunk(
  "queuesAdd",
  async (payload) => {
    try {
      const response = await api_queues_add(payload);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getUniqueQueues = createAsyncThunk(
  "getUniqueQueues",
  async (payload) => {
    try {
      const response = await api_queues_get(payload);
      const data = parser_queues_get(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.snackbar = action.payload;
    },
    set_queues_data_created: (state, action) => {
      const { data } = action.payload;

      let filter = state.queues_data.filter(
        (obj) => obj.job_id === data.job_id
      );
      if (filter.length <= 0)
        state.queues_data = [
          data,
          ...state.queues_data,
        ];
    },
    set_queues_data_update: (state, action) => {
      const { data } = action.payload;
      state.queues_data.forEach((obj, index) => {
        if (obj.job_id === data.job_id) {
          state.queues_data[index] = {
            ...obj,
            ...data,
          };
        }
      });
    },
  },
  extraReducers: {
    [queuesGetList.pending]: (state, action) => {
      state.queues_data_loading = true;
    },
    [queuesGetList.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.queues_data_loading = false;
      state.queues_data = data;
    },
    [queuesGetList.rejected]: (state, action) => {
      state.queues_data_loading = false;
    },
    // Add queues
    [queuesAdd.pending]: (state, action) => {
      state.add_loading = true;
    },
    [queuesAdd.fulfilled]: (state, action) => {
      state.add_loading = false;
    },
    [queuesAdd.rejected]: (state, action) => {
      state.add_loading = false;
    },
    // Get queues
    [getUniqueQueues.pending]: (state, action) => {
      state.queues_data_loading = true;
    },
    [getUniqueQueues.fulfilled]: (state, action) => {
      state.queues_data_loading = false;
      state.unique_queues_data = action.payload
    },
    [getUniqueQueues.rejected]: (state, action) => {
      state.queues_data_loading = false;
    },

  }
});

// Action creators are generated for each case reducer function
export const {
  setSnackBar,
  set_queues_data_created,
  set_queues_data_update,
} = common.actions;

export default common.reducer;
