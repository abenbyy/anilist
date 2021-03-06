import styled from "@emotion/styled";
import { TERTIARY, TEXT_ON_TERTIARY } from "styles/global";

export const NavBar = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: `${TERTIARY}`,
  color: `${TEXT_ON_TERTIARY}`,
});

export const NavLogo = () => {
  return (
    <img
      style={{
        width: "50px",
      }}
      src="https://anilist.co/img/icons/icon.svg"
      alt=""
    />
  );
};
