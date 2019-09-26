import React, { useEffect, useReducer } from "react";
import { ReactComponent as SearchIconSvg } from "../imgs/search.svg";
import { ReactComponent as ClearIconSvg } from "../imgs/error.svg";
import styled from "styled-components";

const waitSec = 1;

const Wrapper = styled.div`
  width: 100%;
`;

const Box = styled.div`
  width: 100%;
  height: 44px;
  background: ${props => (props.error ? "#d6d6d6" : "white")};
  border-radius: 30px;
  border: ${props => {
    if (props.isWaiting) {
      return "3px dotted #cccccc";
    }
    if (props.error) {
      return "3px solid rgb(254,127,127)";
    }
    return "1px solid #cccccc";
  }};
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  opacity: ${props => (props.error ? 0.32 : 1)};
`;

const SearchIcon = styled(SearchIconSvg)`
  height: 20px;
  margin-left: 10px;
`;

const ClearIcon = styled(ClearIconSvg)`
  height: 20px;
  position: absolute;
  right: 10px;

  :hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: calc(100% - 40px);
  background: rgba(0, 0, 0, 0);
  border: 0;
  position: absolute;
  left: 33px;

  :hover {
    cursor: ${props => (props.disabled ? " not-allowed" : "auto")};
  }
`;

const Tip = styled.p`
  color: #6d7175;
  margin: 5px;
  color: ${props => (props.isError ? "rgb(254, 127, 127)" : "auto")};
`;

function TipText({ error }) {
  let text = error;
  if (!error) {
    text = `Type and wait ${waitSec} second or press enter to search.`;
  }
  return <Tip isError={error}>{text}</Tip>;
}

const initState = {
  isWait: false,
  isEnter: false,
  query: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "enter":
      return {
        isWait: false,
        isEnter: true,
        query: state.query
      };
    case "type":
      return {
        isWait: true,
        isEnter: false,
        query: action.query
      };
    case "search":
      return {
        ...state,
        isWait: false
      };
    case "clear":
      return {
        isWait: false,
        isEnter: false,
        query: ""
      };

    default:
      throw new Error();
  }
}

function useAutoSearch(search, _waitSec) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { query, isEnter } = state;

  useEffect(() => {
    const doSearch = async () => {
      dispatch({ type: "search" });
      await search(query);
    };
    if (!query) {
      return;
    }
    if (isEnter) {
      doSearch();
      return;
    }
    const w = setTimeout(async () => {
      // console.log("effect trigger", query, isEnter, search);
      doSearch();
    }, _waitSec * 1000);

    return () => {
      // console.log("clear effect", query);
      clearTimeout(w);
    };
  }, [query, isEnter, search, _waitSec]);

  function onEnter() {
    dispatch({ type: "enter" });
  }

  function type(q) {
    dispatch({ type: "type", query: q });
  }

  function clear() {
    dispatch({ type: "clear" });
  }

  return [state, onEnter, type, clear];
}

function SearchBox({ handleSearch, error, isRateLimit }) {
  const [state, onEnter, type, clear] = useAutoSearch(handleSearch, waitSec);
  const { query, isWait } = state;
  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      if (isRateLimit) {
        return;
      }
      onEnter();
    }
  };

  const _handleChange = e => {
    if (isRateLimit) {
      return;
    }
    const v = e.target.value;
    type(v);
  };

  return (
    <Wrapper>
      <Box isWaiting={isWait} error={isRateLimit}>
        <SearchIcon />
        <Input
          value={query}
          disabled={isRateLimit}
          onChange={_handleChange}
          onKeyDown={_handleKeyDown}
          placeholder={"type something like: tetris"}
        />
        <ClearIcon onClick={clear} />
      </Box>
      <TipText error={error} />
    </Wrapper>
  );
}

export default SearchBox;
