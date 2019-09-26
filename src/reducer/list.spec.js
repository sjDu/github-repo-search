import { reducer } from "./list";

const initialState = {
  status: "ready", //ready, loading, error
  resumeTime: null,
  items: [],
  total: 0,
  isRateLimit: false
};

it(" will clear items and change status to `loading` when it begins a search", () => {
  const state = reducer(initialState, { type: "searchBegin", query: "tetris" });

  expect(state).toEqual({
    status: "loading",
    resumeTime: null,
    total: 0,
    items: [],
    isRateLimit: false
  });
});

//to do other tests
