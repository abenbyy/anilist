import { css } from "@emotion/css";
import { XMark } from "components";
import { PRIMARY, SECONDARY } from "styles/global";

export default function Modal(props) {
  const { show, children, minWidth = "300px", handleHide, title = "" } = props;

  return (
    <div
      className={css({
        position: "fixed",
        zIndex: "999",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: `${show ? "flex" : "none"}`,
        justifyContent: "center",
        alignItems: "center",
      })}
      onClick={() => handleHide()}
    >
      <div
        className={css({
          borderRadius: "6px",
          display: "flex",
          margin: "10px",
          flexDirection: "column",
          backgroundColor: `${PRIMARY}`,
          width: "fit-content",
          minWidth: `${minWidth}`,
          minHeight: "240px",
          padding: "0.8rem",
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
              color: `${SECONDARY}`,
            })}
          >
            {title}
          </div>
          <button
            className={css({
              border: "none",
              backgroundColor: PRIMARY,
            })}
            onClick={() => handleHide()}
          >
            <XMark
              className={css({
                width: "10px",
              })}
            />
          </button>
        </div>
        <div
          className={css({
            marginTop: "8px",
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
