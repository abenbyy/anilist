import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { DotProgress } from "components";
import {
  NavBar,
  NavItem,
  Container,
  Center,
  Card,
  Pagination,
  Badge,
} from "components";
import { ALL_ANIME_PAGINATE } from "lib/queries";
import Link from "next/link";
import { useState } from "react";
import {
  BACKGROUND,
  PRIMARY,
  SECONDARY,
  SHADOW,
  TEXT_ON_PRIMARY,
  TEXT_ON_PRIMARY_ALT,
} from "styles/global";

export default function Home() {
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(0);

  const { loading, error, data } = useQuery(ALL_ANIME_PAGINATE, {
    variables: {
      page: page,
      perPage: perPage,
    },
  });

  if (data && !loaded) {
    setMaxPage(Math.ceil(data.Page.pageInfo.total / perPage));
    setLoaded(true);
  }

  return (
    <>
      <NavBar>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px 0 10px",
          }}
        >
          <img
            style={{
              width: "50px",
            }}
            src="https://anilist.co/img/icons/icon.svg"
            alt=""
          />
          <div
            style={{
              display: "flex",
            }}
          >
            <Link style={{ cursor: "pointer" }} href="/">
              <NavItem
                style={{
                  borderBottom: "3px solid white",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "14pt" }}>Anime</div>
                <div style={{ fontSize: "8pt" }}>アニメ</div>
              </NavItem>
            </Link>
            <Link style={{ cursor: "pointer" }} href="/collections">
              <NavItem>
                <div style={{ fontSize: "14pt" }}>Collections</div>
                <div style={{ fontSize: "8pt" }}>コレクション</div>
              </NavItem>
            </Link>
          </div>
        </Container>
      </NavBar>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 20px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DotProgress />
        </div>
      )}
      {!loading && (
        <Center
          style={{
            backgroundColor: BACKGROUND,
            padding: "20px 0 20px 0",
          }}
        >
          <Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "2rem",
              }}
            >
              {data?.Page.media.map((anime, i) => (
                <Link key={i} href={`/detail/${anime.id}`}>
                  <Card
                    style={{
                      backgroundColor: PRIMARY,
                      borderRadius: "10px",
                      width: "100%",
                      boxShadow: `0 4px 8px 0 ${SHADOW}`,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "250px",
                        height: "250px",
                        objectFit: "fill",
                        borderRadius: "10px 10px 0 0",
                      }}
                      src={anime.coverImage.large}
                      alt=""
                    />
                    <div
                      style={{
                        padding: "0.6rem 1rem 1rem 1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "12pt",
                          color: `${TEXT_ON_PRIMARY}`,
                        }}
                      >
                        {anime.title.romaji}
                      </div>
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: "10pt",
                          color: `${SECONDARY}`,
                        }}
                      >
                        {anime.studios?.nodes[0]?.name}
                      </div>
                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: "10pt",
                          color: `${TEXT_ON_PRIMARY_ALT}`,
                        }}
                      >
                        {anime.season} {anime.seasonYear} • {anime.episodes}{" "}
                        episode(s)
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div>
                Showing {page * perPage} - {(page + 1) * perPage} of{" "}
                {data.Page.pageInfo.total} items
              </div>
              <div
                className={css({
                  display: "flex",
                })}
              >
                <select
                  className={css({
                    border: "none",
                    boxShadow: `0 4px 8px 0 ${SHADOW}`,
                    padding: "6px",
                    borderRadius: "5px",
                    color: `${SECONDARY}`,
                    backgroundColor: `${PRIMARY}`,
                  })}
                  name=""
                  id=""
                  onChange={(e) => {
                    setPerPage(e.target.value);
                    setLoaded(false);
                  }}
                >
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                  <option value={100}>100 / page</option>
                </select>
                <Pagination
                  currentPage={page}
                  totalPage={maxPage}
                  onPageChange={(p) => setPage(p)}
                />
              </div>
            </div>
          </Container>
        </Center>
      )}
    </>
  );
}
