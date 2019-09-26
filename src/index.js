import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import { Main, Header, Content, Footer } from "./components";
import { useSearchList } from "./reducer";
import "./reset.css";

function useCountdown(resumeTime, isRateLimit) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let id;
    if (isRateLimit) {
      const left = Math.floor(resumeTime - Date.now() / 1000);
      setCount(left);
      id = setInterval(() => {
        setCount(c => c - 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [isRateLimit, setCount, resumeTime]);

  return [count];
}

function App() {
  const [state, search, nextPage] = useSearchList();
  const isLoading = state.status === "loading";
  const list = state.items;
  const isEnd = list.length !== 0 && list.length === state.total;
  const { resumeTime, isRateLimit } = state;
  let error = "";
  const [count] = useCountdown(resumeTime, isRateLimit);
  if (state.status === "error") {
    if (isRateLimit) {
      error = "Wait " + count + " seconds for next request.";
    } else {
      error = "Fetch fail.";
    }
  }

  useEffect(() => {
    var scrollEndObserver = new IntersectionObserver(async function(entries) {
      if (entries[0].intersectionRatio <= 0) {
        return;
      }
      nextPage();
      console.log("Loaded new items");
    });

    scrollEndObserver.observe(document.querySelector("#footer"));

    return;
  }, []);

  const handleSearch = useCallback(async query => {
    console.log("search", query);
    const r = await search(query);
    return r;
  }, []);

  return (
    <Main className="App">
      <Header />
      <Content
        list={list}
        isLoading={isLoading}
        handleSearch={handleSearch}
        error={error}
        isRateLimit={isRateLimit}
      />

      <Footer id="footer" isHide={list.length === 0} isEnd={isEnd}>
        End
      </Footer>
    </Main>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
