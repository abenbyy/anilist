import { css } from "@emotion/css";
import { SECONDARY } from "styles/global";

export default function FloatingActionButton(props) {
  const { offSet = 50 } = props;
  return (
    <div
      className={css({
        cursor: "pointer",
        position: "fixed",
        padding: "1rem",
        zIndex: "999",
        bottom: "50px",
        right: `${offSet}px`,
        height: "50px",
        borderRadius: "0.5rem",
        backgroundColor: `${SECONDARY}`,
        fontSize: "12pt",
      })}
      {...props}
    >
      {props.children}
    </div>
  );
}
