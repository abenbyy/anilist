import styled from "@emotion/styled";
import { TEXT_ON_PRIMARY_ALT } from "styles/global";

export const CollectionCard = styled.div({
  borderRadius: "0.375rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
  cursor: "pointer",
});

export const CollectionImage = styled.img({
  height: "100px",
  width: "72px",
  objectFit: "contain",
});

export const CollectionList = styled.div({
  fontSize: "10pt",
  color: `${TEXT_ON_PRIMARY_ALT}`,
});
