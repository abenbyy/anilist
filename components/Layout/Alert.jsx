import { css } from "@emotion/css";
import { XMark } from "components";

export default function Alert(props) {
  const { show, children, type, timeOut = 3, hideCallback, title = "" } = props;
  let color = "";
  switch (type) {
    case "success":
      color = "#f6ffee";
      break;
    case "warning":
      color = "#fffbe6";
      break;
    default:
      break;
  }
  if (show)
    setTimeout(() => {
      hideCallback();
    }, timeOut * 1000);

  return (
    <div
      className={css({
        position: "fixed",
        padding: "1rem",
        zIndex: "999",
        width: "500px",
        top: "10px",
        right: "10px",
        height: "100px",
        borderRadius: "0.5rem",
        backgroundColor: `${color}`,
        color: "black",
        display: `${show ? "flex" : "none"}`,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        fontSize: "12pt",
        "@media (max-width: 900px)": {
          width: "250px",
        },
      })}
    >
      <div
        className={css({
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <div
          className={css({
            fontSize: "16pt",
            "@media (max-width: 900px)": {
              width: "12pt",
              fontSize: "16pt",
            },
          })}
        >
          {title}
        </div>
        <button
          className={css({
            backgroundColor: `${color}`,
            border: "none",
            padding: "10px",
          })}
          onClick={() => hideCallback()}
        >
          <XMark
            className={css({
              width: "10px",
            })}
          />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
