import styled from "styled-components";

const Footer = styled.footer`
  width: 100%;
  /* height: ${props => (props.isHide ? "0" : "50px")}; */
  height: 50px;
  display: ${props => (props.isHide ? "none" : "block")};
  /* background: pink; */
  text-align: center;
  color: #6d7175;
  visibility: ${props => (props.isEnd ? "visible" : "hidden")};
`;

export default Footer;
