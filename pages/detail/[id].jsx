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
  Badge,
  Card,
} from "components";
import Link from "next/link";
import { ANIME_DETAIL } from "lib/queries/";
import {
  PRIMARY,
  BACKGROUND,
  SECONDARY,
  SHADOW,
  TEXT_ON_PRIMARY,
  TEXT_ON_PRIMARY_ALT,
  TEXT_ON_SECONDARY,
} from "styles/global";
import parse from "html-react-parser";
import styled from "@emotion/styled";
import { convertMonth } from "lib/utils";

const StyledLabel = styled.div({
  width: "fit-content",
  backgroundColor: `${SECONDARY}`,
  color: `${TEXT_ON_SECONDARY}`,
  borderRadius: "10px",
  padding: "4px 8px",
  fontSize: "8pt",
});

const StyledStats = styled.div({
  color: `${TEXT_ON_PRIMARY}`,
  fontSize: "16pt",
  marginTop: "5px",
});

const Label = styled.div({
  color: `${TEXT_ON_PRIMARY}`,
  fontWeight: "bold",
  fontSize: "10pt",
  marginTop: "10px",
});
const Stats = styled.div({
  color: `${TEXT_ON_PRIMARY_ALT}`,
  fontSize: "11pt",
});

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
                      boxShadow: `0 4px 8px 0 rgba(0,0,0,0.6)`,
                    })}
                    src={data.Media.coverImage.extraLarge}
                    alt=""
                  />
                  <Button
                    className={css({
                      width: "100%",
                      marginTop: "15px",
                    })}
                  >
                    Add to Collections
                  </Button>
                  <div
                    className={css({
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                    })}
                  >
                    {data.Media.genres.map((gen, i) => (
                      <Badge
                        className={css({
                          marginRight: "5px",
                          marginBottom: "5px",
                        })}
                        key={i}
                      >
                        {gen}
                      </Badge>
                    ))}
                  </div>
                  <div
                    className={css({
                      marginTop: "15px",
                    })}
                  >
                    <Label>Japanese Title</Label>
                    <Stats>{data.Media.title.native}</Stats>
                    <Label>English Title</Label>
                    <Stats>{data.Media.title.english}</Stats>
                    <Label>Aired at</Label>
                    <Stats>{`${convertMonth(data.Media.startDate.month)} ${
                      data.Media.startDate.day
                    }, ${data.Media.startDate.year} - ${convertMonth(
                      data.Media.endDate.month
                    )} ${data.Media.endDate.day}, ${
                      data.Media.endDate.year
                    }`}</Stats>
                    <Label>Episodes</Label>
                    <Stats>{`${data.Media.episodes} episode(s)`}</Stats>
                    <Label>Duration</Label>
                    <Stats>{`${data.Media.duration} min`}</Stats>
                    <Label>Studios</Label>
                    <Stats>
                      {data.Media.studios.nodes.length <= 0 && <div>-</div>}
                      {data.Media.studios.nodes.map((st, i) => (
                        <div key={i}>{st.name}</div>
                      ))}
                    </Stats>
                  </div>
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
                  <div
                    className={css({
                      marginTop: "10px",
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                      gap: "1rem",
                      padding: "10px 10px",
                      backgroundColor: `${PRIMARY}`,
                      borderRadius: "8px",
                    })}
                  >
                    <div>
                      <StyledLabel>Popularity</StyledLabel>
                      <StyledStats>#{data.Media.popularity}</StyledStats>
                    </div>
                    <div>
                      <StyledLabel>Rating</StyledLabel>
                      <StyledStats>
                        {data.Media.averageScore}{" "}
                        <span
                          className={css({
                            fontSize: "10pt",
                          })}
                        >
                          {" "}
                          / 100
                        </span>
                      </StyledStats>
                    </div>
                    <div>
                      <StyledLabel>Season</StyledLabel>
                      <StyledStats>
                        {data.Media.season} {data.Media.seasonYear}
                      </StyledStats>
                    </div>
                    <div>
                      <StyledLabel>Status</StyledLabel>
                      <StyledStats>{data.Media.status}</StyledStats>
                    </div>
                  </div>
                  <div
                    className={css({
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "1rem",
                      marginTop: "20px",
                    })}
                  >
                    {data.Media.characters.edges?.map((char, i) => (
                      <Card
                        style={{
                          backgroundColor: PRIMARY,
                          borderRadius: "4px",
                          width: "100%",
                          height: "fit-content",
                          boxShadow: `0 4px 8px 0 ${SHADOW}`,
                          cursor: "pointer",
                        }}
                        key={i}
                      >
                        <div
                          className={css({
                            padding: "4px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "10pt",
                          })}
                        >
                          <div
                            className={css({
                              display: "flex",
                              width: "100%",
                              color: `${SECONDARY}`,

                              alignItems: "center",
                            })}
                          >
                            <img
                              className={css({
                                width: "80px",
                                height: "120px",
                              })}
                              src={char.node.image.medium}
                              alt=""
                            />
                            <div
                              className={css({
                                height: "100%",
                                marginLeft: "10px",
                              })}
                            >
                              {char.node.name.full}
                            </div>
                          </div>
                          <div
                            className={css({
                              display: "flex",
                              color: `${SECONDARY}`,
                              alignItems: "center",
                            })}
                          >
                            <div
                              className={css({
                                height: "100%",
                                marginRight: "10px",
                                textAlign: "right",
                              })}
                            >
                              {char.voiceActors[0].name.full}
                            </div>
                            <img
                              className={css({
                                width: "80px",
                                height: "120px",
                              })}
                              src={char.voiceActors[0].image.medium}
                              alt=""
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
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
