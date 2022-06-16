import styled from "@emotion/styled";

export const NavItem = styled.div((props) => ({
  height: "100%",
  padding: "15px 10px 10px 10px",
  margin: "0 10px 0 10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  cursor: "pointer",
  borderBottom: `${props.active ? "3px solid white" : "none"}`,
}));
