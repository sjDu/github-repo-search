import React from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import RepoList from "./RepoList";

const Block = styled.main`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  justify-content: center;
`;

const ContentBlock = styled.div`
  width: 760px;

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const SearchBlcok = styled.div`
  padding: 10px;
  position: fixed;
  top: 60px;
  width: 100%;
  max-width: 764px;
  margin-left: -2px;
  background: #fff;
  box-sizing: border-box;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

function Content({ list, isLoading, handleSearch, error, isRateLimit }) {
  return (
    <Block>
      <ContentBlock>
        <SearchBlcok>
          <SearchBox
            handleSearch={handleSearch}
            error={error}
            isRateLimit={isRateLimit}
          />
        </SearchBlcok>
        <RepoList list={list} isLoading={isLoading} />
      </ContentBlock>
    </Block>
  );
}

export default Content;
