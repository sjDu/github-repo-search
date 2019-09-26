import React from "react";
import styled from "styled-components";

import SearchBox from "./SearchBox";

const Block = styled.header`
  width: 100%;
  height: 60px;
  padding: 10px;
  background: #2c2c2c;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
`;

const Title = styled.h1`
  color: white;
  font-size: 2em;
`;

function Header({ handleSearch }) {
  return (
    <Block>
      <Title>GIthub Repo Search</Title>
    </Block>
  );
}

export default Header;
