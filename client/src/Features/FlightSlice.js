import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for adding a flight
export const addFlight = createAsyncThunk(
  "flights/addFlight",
  async (flightData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://fullstack-server-1.onrender.com/addFlight", flightData);
      return response.data.flight;
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === "Flight with this ID already exists.") {
        console.error("Flight ID already exists:", error);
        return rejectWithValue("Flight with this ID already exists.");
      } else {
        console.error("Error adding flight:", error);
        return rejectWithValue(error.response ? error.response.data : "Error adding flight");
      }
    }
  }
);

// Define the async thunk for deleting a flight
export const deleteFlight = createAsyncThunk(
  "flights/deleteFlight",
  async (flightId, { rejectWithValue }) => {
    try {
      console.log("Deleting flight with ID:", flightId);
      const response = await axios.delete(`https://fullstack-server-1.onrender.com/flights/${flightId}`);
      return response.data.message;
    } catch (error) {
      console.error("Error deleting flight:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the async thunk for updating a flight
export const updateFlight = createAsyncThunk(
  'flights/updateFlight',
  async ({ flightId, destination, date, time, price, airline }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://fullstack-server-1.onrender.com/updateFlight/${flightId}`, {
        destination,
        date,
        time,
        price,
        airline,
      });
      return response.data.flight;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the async thunk for fetching flights
export const getFlights = createAsyncThunk(
  'flights/getFlights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://fullstack-server-1.onrender.com/api/flights');
      return response.data.flights;
    } catch (error) {
      console.error('Error getting flights:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initVal = {
  flights: [],
  status: 'idle',
  error: null,
};

// Create the slice
export const flightSlice = createSlice({
  name: "flights",
  initialState: initVal,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFlight.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFlight.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights.push(action.payload);
      })
      .addCase(addFlight.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteFlight.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = state.flights.filter(flight => flight.flightId !== action.meta.arg);
      })
      .addCase(deleteFlight.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //-------------------
      .addCase(getFlights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = action.payload;
      })
      .addCase(getFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //----------------
      .addCase(updateFlight.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFlight.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.flights.findIndex(flight => flight.flightId === action.payload.flightId);
        if (index !== -1) {
          state.flights[index] = action.payload;
        }
      })
      .addCase(updateFlight.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default flightSlice.reducer;
