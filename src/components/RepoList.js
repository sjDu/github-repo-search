import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import Loader from "./Loader";

const ListUl = styled.ul`
  margin-top: 155px;

  @media (max-width: 760px) {
    margin-top: 170px;
  }
`;

const ItemBlock = styled.div`
  /* width: 100%;
  min-height: 70px; */
  padding: 10px;
  margin-bottom: 8px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

  :hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`;

const Info = styled.div``;
const Name = styled.a`
  height: 20px;
  width: 500px;
  display: inline-block;
  padding: 0 0 5px 0;
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    font-size: 17px;
  }
  @media (max-width: 500px) {
    width: calc(100vw - 90px);
  }
`;

const Desc = styled.div`
  font-size: 12px;
  color: #6d7175;
  word-break: break-all;
  padding-right: 10px;
  box-sizing: border-box;
`;

const AvatarBox = styled.a`
  margin-right: 15px;
  border-radius: 50%;
  :hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`;

const LoaderBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Repo(it) {
  return (
    <ItemBlock>
      <AvatarBox href={it.owner.html_url} target="_blank">
        <Avatar src={it.owner.avatar_url} alt="" />
      </AvatarBox>
      <Info>
        <Name href={it.html_url} target="_blank">
          {it.full_name}
        </Name>
        <Desc>{it.description}</Desc>
      </Info>
    </ItemBlock>
  );
}

function RepoList({ list, isLoading }) {
  // isLoading = true;
  return (
    <ListUl>
      {/* {isLoading ? "loading top..." : null} */}
      {list.map((it, i) => {
        return (
          <li key={it.id}>
            <Repo {...it} />
          </li>
        );
      })}
      {isLoading ? (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      ) : null}
    </ListUl>
  );
}

export default RepoList;
