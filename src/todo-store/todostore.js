import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 🔹 1. Create a slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    reset: (state) => { state.value = 0 },
  },
});

const { increment, decrement, reset } = counterSlice.actions;

// 🔹 2. Create a store
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

// 🔹 3. Component using Redux
const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Redux Toolkit Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}> + </button>
      <button onClick={() => dispatch(decrement())}> - </button>
      <button onClick={() => dispatch(reset())}> Reset </button>
    </div>
  );
};

// 🔹 4. App wrapped with Provider
export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
