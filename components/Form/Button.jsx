import styled from "@emotion/styled";
import { SECONDARY, TEXT_ON_SECONDARY } from "styles/global";

export const Button = styled.button({
  backgroundColor: `${SECONDARY}`,
  color: `${TEXT_ON_SECONDARY}`,
  padding: `10px 16px`,
  border: "none",
  borderRadius: "6px",
});
