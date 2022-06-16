import styled from "@emotion/styled";
import { PRIMARY, SHADOW } from "styles/global";
import { Card } from "./Card";

export const AnimeCard = styled(Card)({
  backgroundColor: PRIMARY,
  borderRadius: "10px",
  width: "225px",
  boxShadow: `0 4px 8px 0 ${SHADOW}`,
  cursor: "pointer",
});

export const AnimeImage = styled.img({
  width: "225px",
  maxHeight: "250px",
  height: "250px",
  objectFit: "fill",
  borderRadius: "10px 10px 0 0",
});

export const AnimeCardText = styled.div((props) => ({
  fontWeight: `${props.size === "large" ? "600" : "400"}`,
  fontSize: `${props.size === "large" ? "12pt" : "10pt"}`,
  color: `${props.color}`,
}));
