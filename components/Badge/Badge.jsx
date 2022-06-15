import styled from "@emotion/styled";
import { SECONDARY, TEXT_ON_SECONDARY } from "styles/global";

export const Badge = styled.div({
  backgroundColor: `${SECONDARY}`,
  color: `${TEXT_ON_SECONDARY}`,
  padding: "6px 10px",
  borderRadius: "20px",
  width: "fit-content",
  fontSize: "8pt",
  textAlign: "center",
});
