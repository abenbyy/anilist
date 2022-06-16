import styled from "@emotion/styled";
import { PRIMARY, SECONDARY, SHADOW } from "styles/global";

export const Select = styled.select({
  width: "fit-content",
  border: "none",
  boxShadow: `0 4px 8px 0 ${SHADOW}`,
  padding: "6px",
  borderRadius: "5px",
  color: `${SECONDARY}`,
  backgroundColor: `${PRIMARY}`,
});
