import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { css } from "@emotion/css";
import {
  NavBar,
  Center,
  Container,
  NavItem,
  DotProgress,
  Button,
} from "components";
import Link from "next/link";
import { ANIME_DETAIL } from "lib/queries/ANIME_DETAIL";
import {
  BACKGROUND,
  TEXT_ON_PRIMARY,
  TEXT_ON_PRIMARY_ALT,
} from "styles/global";
import parse from "html-react-parser";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery(ANIME_DETAIL, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {}, [id]);
  console.log(data);
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
        <div
          className={css({
            backgroundColor: `${BACKGROUND}`,
          })}
        >
          <img
            className={css({
              width: "100%",
              height: "250px",
              objectFit: "cover",
            })}
            src={data.Media.bannerImage}
            alt=""
          />
          <Center>
            <Container>
              <div
                className={css({
                  display: "flex",
                })}
              >
                <div>
                  <img
                    className={css({
                      width: "215px",
                      height: "305px",
                      marginTop: "-85px",
                    })}
                    src={data.Media.coverImage.extraLarge}
                    alt=""
                  />
                  <Button
                    className={css({
                      width: "100%",
                    })}
                  >
                    Add to Collections
                  </Button>
                </div>
                <div
                  className={css({
                    padding: "1rem",
                  })}
                >
                  <div
                    className={css({
                      fontSize: "16pt",
                      color: `${TEXT_ON_PRIMARY}`,
                    })}
                  >
                    {data.Media.title.romaji}
                  </div>
                  <div
                    className={css({
                      fontSize: "12pt",
                      marginTop: "5px",
                      color: `${TEXT_ON_PRIMARY_ALT}`,
                    })}
                  >
                    {parse(data.Media.description)}
                  </div>
                </div>
              </div>
            </Container>
          </Center>
        </div>
      )}
    </>
  );
}
