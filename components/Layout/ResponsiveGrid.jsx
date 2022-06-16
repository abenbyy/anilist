import styled from "@emotion/styled";

export const ResponsiveGrid = styled.div((props) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${props.cols}, minmax(0, 1fr))`,
  gap: "1rem",
  "@media (max-width: 900px)": {
    gridTemplateColumns: `repeat(${props.smallCols}, minmax(0, 1fr))`,
  },
}));
