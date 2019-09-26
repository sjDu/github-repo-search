import { useReducer, useRef, useEffect } from "react";
import { searchRepo } from "../utils";

const initialState = {
  status: "ready", //ready, loading, error
  resumeTime: null,
  items: [],
  total: 0,
  isRateLimit: false
};

function reducer(state, action) {
  switch (action.type) {
    case "searchBegin":
      return {
        ...state,
        items: [],
        resumeTime: state.resumeTime,
        status: "loading",
        total: 0
      };
    case "searchDone":
      return {
        ...state,
        items: action.items,
        resumeTime: action.resumeTime,
        status: "ready",
        total: action.total
      };
    case "nextPageBegin":
      return {
        ...state,
        status: "loading"
      };
    case "nextPageDone":
      return {
        ...state,
        items: [...state.items, ...action.items],
        resumeTime: action.resumeTime,
        status: "ready"
      };
    case "fail":
      return {
        ...state,
        resumeTime: action.resumeTime,
        status: "error",
        isRateLimit: action.isRateLimit
      };
    case "resumeRateLimit":
      return {
        ...state,
        status: "ready",
        isRateLimit: false
      };
    default:
      throw new Error();
  }
}

function useSearchList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isRateLimit, resumeTime } = state;
  const page = useRef(0);
  const lastQuery = useRef("");

  useEffect(() => {
    let id;
    if (isRateLimit) {
      const t = resumeTime * 1000 - Date.now();
      // console.log("trigger rate limit", t);
      id = setTimeout(() => {
        // console.log("clear rate limit");
        dispatch({ type: "resumeRateLimit" });
      }, t);
    }

    return () => clearTimeout(id);
  }, [isRateLimit, resumeTime]);

  function throttle(work) {
    let isLoading = false;
    return async (...args) => {
      if (isLoading) {
        return;
      }
      isLoading = true;
      try {
        const r = await work(...args);
        isLoading = false;
        return r;
      } catch (error) {
        isLoading = false;
        throw error;
      }
    };
  }
  const search = throttle(async query => {
    if (state.status === "loading") {
      return;
    }
    dispatch({ type: "searchBegin", query });
    page.current = 1;
    lastQuery.current = query;
    try {
      const r = await searchRepo(query);
      // const r = {};
      dispatch({
        type: "searchDone",
        items: r.items,
        resumeTime: r.resumeTime,
        total: r.total
      });
      return r;
    } catch (error) {
      dispatch({
        type: "fail",
        resumeTime: error.resumeTime,
        isRateLimit: error.isRateLimit
      });
    }
  });

  const nextPage = throttle(async () => {
    if (state.status !== "ready") {
      return;
    }
    if (!lastQuery.current) {
      return;
    }
    dispatch({ type: "nextPageBegin" });

    try {
      const r = await searchRepo(lastQuery.current, page.current + 1);
      page.current = r.page;
      dispatch({
        type: "nextPageDone",
        items: r.items,
        resumeTime: r.resumeTime
      });
      return r;
    } catch (error) {
      dispatch({
        type: "fail",
        resumeTime: error.resumeTime,
        isRateLimit: error.isRateLimit
      });
    }
  });

  return [state, search, nextPage];
}

export { useSearchList, reducer };
