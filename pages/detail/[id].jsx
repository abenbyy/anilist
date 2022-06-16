import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import {
  NavLogo,
  NavBar,
  Center,
  Container,
  NavItem,
  DotProgress,
  Input,
  Button,
  Badge,
  Card,
  Modal,
  CollectionCard,
  CollectionImage,
  CollectionList,
  ResponsiveGrid,
  Alert,
  LoadingScreen,
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
import useStorage from "lib/hooks/useStorage";
import Head from "next/head";

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
  "@media (max-width: 900px)": {
    fontSize: "12pt",
  },
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

const BannerImage = styled.img({
  width: "100%",
  height: "250px",
  objectFit: "cover",
});

const CoverImage = styled.img({
  width: "100%",
  height: "305px",
  marginTop: "-85px",
  boxShadow: `0 4px 8px 0 rgba(0,0,0,0.6)`,
  "@media (max-width: 900px)": {
    height: "auto",
  },
});

const SectionTitle = styled.div({
  color: `${TEXT_ON_PRIMARY}`,
  fontSize: "16pt",
  marginTop: "10px",
});

const CharacterImage = styled.img({
  width: "70px",
  height: "100px",
});

const CharacterName = styled.div({
  height: "100%",
  width: "70px",
});

const RecommendedImage = styled.img({
  height: "250px",
  maxWidth: "200px",
});
const RecommendedTitle = styled.div({
  color: `${TEXT_ON_PRIMARY}`,
  marginTop: "5px",
  fontsize: "10pt",
  maxWidth: "200px",
});

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: "",
    title: "",
    type: "success",
  });
  const [newCollection, setNewCollection] = useState("");
  const { data, error, loading } = useQuery(ANIME_DETAIL, {
    variables: {
      id: id,
    },
  });

  const [storage, setStorage, isInStorage] = useStorage();
  const [referCollection, setReferCollection] = useState([]);

  useEffect(() => {
    if (loading) return;
    let arr = [];
    storage.forEach((col) => {
      col.list.forEach((anime) => {
        if (anime.id === data.Media.id) arr.push(col);
      });
    });
    console.log(arr);
    setReferCollection(arr);
  }, [loading, id, storage]);

  const handleNewCollection = () => {
    addToCollection(newCollection, "new");
    setNewCollection("");
  };
  const addToCollection = (collectionName, action) => {
    if (collectionName === "") {
      setAlertConfig({
        ...alertConfig,
        show: true,
        title: "Alert",
        type: "warning",
        message: `Collection name cannot be empty`,
      });
      return;
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(collectionName)) {
      setAlertConfig({
        ...alertConfig,
        show: true,
        title: "Alert",
        type: "warning",
        message: `Collection name cannot contain special characters`,
      });
      return;
    }
    if (
      action === "new" &&
      storage.map((col) => col.name).indexOf(collectionName) !== -1
    ) {
      setAlertConfig({
        ...alertConfig,
        show: true,
        title: "Alert",
        type: "warning",
        message: `Collection "${collectionName}" already exist`,
      });
      return;
    }
    if (isInStorage(collectionName, data.Media.title.romaji)) {
      setAlertConfig({
        ...alertConfig,
        show: true,
        title: "Alert",
        type: "warning",
        message: "Anime is already in that collection",
      });
    } else {
      setStorage(collectionName, {
        id: data.Media.id,
        title: data.Media.title.romaji,
        image: data.Media.coverImage.large,
      });
      setAlertConfig({
        ...alertConfig,
        show: true,
        title: "Success",
        type: "success",
        message: "Anime have been added to your collection",
      });
    }

    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Abenbyy&apos;s Anilist | {data?.Media.title.romaji}</title>
      </Head>
      <Alert
        show={alertConfig.show}
        title={alertConfig.title}
        type={alertConfig.type}
        timeOut={5}
        hideCallback={() => setAlertConfig({ ...alertConfig, show: false })}
      >
        {alertConfig.message}
      </Alert>
      <Modal
        show={showModal}
        title={"Collections"}
        handleHide={() => {
          setShowModal(false);
        }}
      >
        {storage.length > 0 && <div>Add to My Collection</div>}
        {storage.length === 0 && <div>You have no collections yet</div>}
        {storage.map((str, i) => (
          <CollectionCard
            key={i}
            onClick={() => addToCollection(str.name, "existing")}
          >
            <div
              className={css({
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              })}
            >
              <CollectionImage
                src={
                  str.list.length > 0
                    ? str.list[0].image
                    : "https://anilist.co/img/icons/icon.svg"
                }
                alt=""
              />
              <div
                className={css({
                  marginLeft: "20px",
                  fontSize: "16pt",
                })}
              >
                <div>{str.name}</div>
                <CollectionList
                  className={css({
                    fontSize: "10pt",
                    color: `${TEXT_ON_PRIMARY_ALT}`,
                  })}
                >
                  {str.list.map((anime, i) => {
                    if (i === 0) return anime.title;
                    else return `, ${anime.title}`;
                  })}
                </CollectionList>
              </div>
            </div>
            <div
              className={css({
                marginLeft: "10px",
              })}
            >
              +
            </div>
          </CollectionCard>
        ))}

        <div className={css({ marginTop: "10px" })}>
          Create a New Collection
        </div>
        <div>
          <Input
            placeholder="New collection name"
            value={newCollection}
            onChange={(e) => setNewCollection(e.target.value)}
            type="text"
          />
          <Button
            onClick={handleNewCollection}
            className={css({ marginTop: "10px" })}
          >
            Create and Add
          </Button>
        </div>
      </Modal>
      <NavBar>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px 0 10px",
          }}
        >
          <Link style={{ cursor: "pointer" }} href="/">
            <NavLogo />
          </Link>
          <div
            style={{
              display: "flex",
            }}
          >
            <Link style={{ cursor: "pointer" }} href="/">
              <NavItem active={true}>
                <div className={css({ fontSize: "14pt" })}>Anime</div>
                <div className={css({ fontSize: "8pt" })}>アニメ</div>
              </NavItem>
            </Link>
            <Link style={{ cursor: "pointer" }} href="/collections">
              <NavItem>
                <div className={css({ fontSize: "14pt" })}>Collections</div>
                <div className={css({ fontSize: "8pt" })}>コレクション</div>
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
        <div
          className={css({
            backgroundColor: `${BACKGROUND}`,
          })}
        >
          <BannerImage src={data.Media.bannerImage} alt="" />
          <Center>
            <Container>
              <div
                className={css({
                  display: "flex",
                  "@media (max-width: 900px)": {
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                })}
              >
                <div
                  className={css({
                    maxWidth: "215px",
                    "@media (max-width: 900px)": {
                      maxWidth: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  })}
                >
                  <CoverImage src={data.Media.coverImage.large} alt="" />
                  <Button
                    className={css({
                      width: "100%",
                      marginTop: "15px",
                    })}
                    onClick={() => {
                      setShowModal(true);
                      setNewCollection("");
                    }}
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
                    <Label>Synonyms</Label>
                    <Stats>
                      {data.Media.synonyms.length <= 0 && <div>-</div>}
                      {data.Media.synonyms.map((sy, i) => (
                        <div key={i}>{sy}</div>
                      ))}
                    </Stats>
                  </div>
                </div>
                <div
                  className={css({
                    padding: "1.5rem",
                    width: "100%",
                    "@media (max-width: 900px)": {
                      marginTop: "20px",
                      padding: "0",
                    },
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
                  <ResponsiveGrid
                    cols={4}
                    smallCols={2}
                    className={css({
                      marginTop: "10px",
                      width: "100%",
                      padding: "10px 10px",
                      backgroundColor: `${PRIMARY}`,
                      borderRadius: "8px",
                    })}
                  >
                    <div>
                      <StyledLabel>Rank</StyledLabel>
                      <StyledStats>#{data.Media.rankings[0].rank}</StyledStats>
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
                  </ResponsiveGrid>
                  <SectionTitle>Characters and Voice Actors</SectionTitle>

                  <ResponsiveGrid
                    cols={2}
                    smallCols={1}
                    className={css({
                      marginTop: "10px",
                    })}
                  >
                    {data.Media.characters.edges?.map((char, i) => (
                      <Card
                        style={{
                          backgroundColor: PRIMARY,
                          borderRadius: "8px",
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
                              width: "50%",
                              color: `${SECONDARY}`,
                              alignItems: "center",
                            })}
                          >
                            <CharacterImage
                              src={char.node.image.medium}
                              alt=""
                            />
                            <CharacterName
                              className={css({
                                marginLeft: "10px",
                              })}
                            >
                              {char.node.name.full}
                            </CharacterName>
                          </div>
                          <div
                            className={css({
                              display: "flex",
                              width: "50%",
                              color: `${SECONDARY}`,
                              alignItems: "center",
                              justifyContent: "flex-end",
                            })}
                          >
                            <CharacterName
                              className={css({
                                textAlign: "right",
                                marginRight: "10px",
                              })}
                            >
                              {char.voiceActors[0].name.full}
                            </CharacterName>
                            <CharacterImage
                              src={char.voiceActors[0].image.medium}
                              alt=""
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </ResponsiveGrid>
                  {data.Media.trailer && (
                    <>
                      <SectionTitle>Trailer</SectionTitle>
                      <iframe
                        className={css({ marginTop: "10px" })}
                        width="100%"
                        height="409"
                        src={`https://www.youtube.com/embed/${data.Media.trailer.id}`}
                        title=""
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </>
                  )}
                  {referCollection.length > 0 && (
                    <>
                      <SectionTitle>In Collection</SectionTitle>
                      <ResponsiveGrid cols={2} smallCols={1}>
                        {referCollection.map((ref, id) => (
                          <Link key={id} href={`/collections/${ref.name}`}>
                            <CollectionCard>
                              <div
                                className={css({
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                })}
                              >
                                <CollectionImage
                                  src={
                                    ref.list.length > 0
                                      ? ref.list[0].image
                                      : "https://anilist.co/img/icons/icon.svg"
                                  }
                                  alt=""
                                />
                                <div className={css({ marginLeft: "20px" })}>
                                  <div>{ref.name}</div>
                                  <CollectionList
                                    className={css({
                                      fontSize: "10pt",
                                      color: `${TEXT_ON_PRIMARY_ALT}`,
                                    })}
                                  >
                                    {ref.list.map((anime, i) => {
                                      if (i === 0) return anime.title;
                                      else return `, ${anime.title}`;
                                    })}
                                  </CollectionList>
                                </div>
                              </div>
                            </CollectionCard>
                          </Link>
                        ))}
                      </ResponsiveGrid>
                    </>
                  )}
                  <SectionTitle>Recommendations</SectionTitle>
                  <ResponsiveGrid
                    cols={4}
                    smallCols={2}
                    className={css({
                      marginTop: "10px",
                    })}
                  >
                    {data.Media.recommendations.nodes.map((rec, i) => {
                      if (i < 4)
                        return (
                          <Link
                            key={i}
                            href={`/detail/${rec.mediaRecommendation.id}`}
                          >
                            <div
                              className={css({
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer",
                              })}
                            >
                              <RecommendedImage
                                src={rec.mediaRecommendation.coverImage.large}
                                alt=""
                              />
                              <RecommendedTitle>
                                {rec.mediaRecommendation.title.romaji}
                              </RecommendedTitle>
                            </div>
                          </Link>
                        );
                    })}
                  </ResponsiveGrid>
                </div>
              </div>
            </Container>
          </Center>
        </div>
      )}
    </>
  );
}
