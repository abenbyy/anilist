import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import {
  NavBar,
  NavItem,
  Container,
  Center,
  Pagination,
  AnimeCard,
  AnimeImage,
  AnimeCardText,
  Select,
  LoadingScreen,
  ResponsiveGrid,
  NavLogo,
  DotProgress,
} from "components";
import { ALL_ANIME_PAGINATE } from "lib/queries";
import Link from "next/link";
import { useState } from "react";
import {
  BACKGROUND,
  SECONDARY,
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
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px 0 10px",
          })}
        >
          <NavLogo />
          <div
            style={{
              display: "flex",
            }}
          >
            <Link style={{ cursor: "pointer" }} href="/">
              <NavItem active={true}>
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
        <LoadingScreen>
          <DotProgress />
        </LoadingScreen>
      )}
      {!loading && (
        <Center
          className={css({
            backgroundColor: BACKGROUND,
            padding: "20px 0 20px 0",
          })}
        >
          <Container>
            <ResponsiveGrid cols={5} smallCols={2}>
              {data?.Page.media.map((anime, i) => (
                <Link key={i} href={`/detail/${anime.id}`}>
                  <AnimeCard>
                    <AnimeImage src={anime.coverImage.large} />
                    <div
                      style={{
                        padding: "0.6rem 1rem 1rem 1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                      }}
                    >
                      <AnimeCardText size={"large"} color={TEXT_ON_PRIMARY}>
                        {anime.title.romaji}
                      </AnimeCardText>
                      <AnimeCardText size={"medium"} color={SECONDARY}>
                        {anime.studios?.nodes[0]?.name}
                      </AnimeCardText>
                      <AnimeCardText
                        size={"medium"}
                        color={TEXT_ON_PRIMARY_ALT}
                      >
                        {anime.season} {anime.seasonYear} • {anime.episodes}{" "}
                        episode(s)
                      </AnimeCardText>
                    </div>
                  </AnimeCard>
                </Link>
              ))}
            </ResponsiveGrid>
            <div
              className={css({
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                "@media (max-width: 900px)": {
                  flexDirection: "column",
                },
              })}
            >
              <div
                className={css({
                  "@media (max-width: 900px)": {
                    marginBottom: "10px",
                  },
                })}
              >
                Showing {page * perPage} - {(page + 1) * perPage} of{" "}
                {data.Page.pageInfo.total} items
              </div>
              <div
                className={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "@media (max-width: 900px)": {
                    flexDirection: "column",
                  },
                })}
              >
                <Select
                  className={css({
                    "@media (max-width: 900px)": {
                      marginBottom: "10px",
                    },
                  })}
                  onChange={(e) => {
                    setPerPage(e.target.value);
                    setLoaded(false);
                  }}
                >
                  {[10, 20, 50, 100].map((val, i) => (
                    <option value={val}>{val} / page</option>
                  ))}
                </Select>
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
