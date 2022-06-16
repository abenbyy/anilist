import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { SHADOW, PRIMARY, SECONDARY, TEXT_ON_PRIMARY } from "styles/global";

const PaginationButton = styled.button({
  width: "30px",
  height: "30px",
  border: `1px solid ${SHADOW}`,
  boxShadow: `0 4px 8px 0 ${SHADOW}`,
  borderRadius: "5px",
  backgroundColor: `${PRIMARY}`,
  margin: "0 2px 0 2px",
  color: `${TEXT_ON_PRIMARY}`,
  "&:hover": {
    boxShadow: `0 2px 8px 0 ${SECONDARY}`,
  },
});

const PaginationDots = styled.div({
  width: "30px",
  height: "30px",
  textAlign: "center",
});

export default function Pagination(props) {
  const { currentPage, totalPage, onPageChange } = props;

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      {currentPage !== 1 && (
        <PaginationButton
          className={css({
            fontWeight: "bold",
            color: `${SECONDARY}`,
          })}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;&lt;
        </PaginationButton>
      )}
      {currentPage > 2 && (
        <>
          <PaginationButton onClick={() => onPageChange(1)}>1</PaginationButton>
          <PaginationButton onClick={() => onPageChange(2)}>2</PaginationButton>
          <PaginationDots>...</PaginationDots>
        </>
      )}

      {currentPage - 1 > 2 && (
        <PaginationButton onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </PaginationButton>
      )}

      <PaginationButton
        className={css({
          fontWeight: "bold",
          color: `${SECONDARY}`,
        })}
      >
        {currentPage}
      </PaginationButton>

      {currentPage + 1 < totalPage - 2 && (
        <PaginationButton onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </PaginationButton>
      )}

      {currentPage < totalPage - 2 && (
        <>
          <PaginationDots>...</PaginationDots>
          <PaginationButton onClick={() => onPageChange(totalPage - 1)}>
            {totalPage - 1}
          </PaginationButton>
          <PaginationButton onClick={() => onPageChange(totalPage)}>
            {totalPage}
          </PaginationButton>
        </>
      )}
      {currentPage !== totalPage && (
        <PaginationButton
          className={css({
            fontWeight: "bold",
            color: `${SECONDARY}`,
          })}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;&gt;
        </PaginationButton>
      )}
    </div>
  );
}
