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
  NavLogo,
  DotProgress,
  XMark,
  AnimeOverlay,
  Modal,
  CollectionCard,
  CollectionImage,
  CollectionList,
  ResponsiveGrid,
  Alert,
  Input,
  Button,
  Edit,
  FloatingActionButton,
} from "components";
import useStorage from "lib/hooks/useStorage";
import { ALL_ANIME_PAGINATE } from "lib/queries";
import Link from "next/link";
import { useState } from "react";
import {
  BACKGROUND,
  SECONDARY,
  TEXT_ON_PRIMARY,
  TEXT_ON_PRIMARY_ALT,
  TEXT_ON_SECONDARY,
} from "styles/global";

export default function Home() {
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(0);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newCollection, setNewCollection] = useState("");
  const [storage, setStorage, isInStorage] = useStorage();
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: "",
    title: "",
    type: "success",
  });
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

    selected.forEach((s) => {
      setStorage(collectionName, {
        id: s.id,
        title: s.title,
        image: s.image,
      });
    });
    setAlertConfig({
      ...alertConfig,
      show: true,
      title: "Success",
      type: "success",
      message: "Anime have been added to your collection",
    });

    setEditing(false);
    setShowModal(false);
  };

  const handleSelect = (idx, id) => {
    let i = selected.map((a) => a.id).indexOf(id);
    if (i === -1)
      setSelected([
        ...selected,
        {
          id: data.Page.media[idx].id,
          title: data.Page.media[idx].title.romaji,
          image: data.Page.media[idx].coverImage.large,
        },
      ]);
    else {
      let arr = [...selected];
      arr.splice(i, 1);
      setSelected(arr);
    }
  };

  const handleCancelSelection = () => {
    setSelected([]);
    setEditing(false);
  };

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
        <div>Add to My Collection</div>
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
      {editing && (
        <>
          <FloatingActionButton offSet={110} onClick={handleCancelSelection}>
            <XMark
              className={css({
                width: "20px",
                height: "20px",
                color: TEXT_ON_SECONDARY,
              })}
            />
          </FloatingActionButton>
          <FloatingActionButton
            onClick={() => {
              setShowModal(true);
              setNewCollection("");
            }}
          >
            <Edit
              className={css({
                width: "20px",
                height: "20px",
                color: TEXT_ON_SECONDARY,
              })}
            />
          </FloatingActionButton>
        </>
      )}
      {!editing && (
        <FloatingActionButton onClick={() => setEditing(true)}>
          <Edit
            className={css({
              width: "20px",
              height: "20px",
              color: TEXT_ON_SECONDARY,
            })}
          />
        </FloatingActionButton>
      )}
      <NavBar>
        <Container
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px 0 10px",
          })}
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
            height: "calc(100vh - 10px)",
          })}
        >
          <Container>
            <ResponsiveGrid
              className={css({
                justifyItems: "center",
                "@media (max-width: 1380px)": {
                  gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
                },
                "@media (max-width: 900px)": {
                  gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
                },
                "@media (max-width: 500px)": {
                  gridTemplateColumns: `repeat(1, minmax(0, 1fr))`,
                },
              })}
              cols={5}
              smallCols={2}
            >
              {data?.Page.media.map((anime, i) => (
                <AnimeCard key={i}>
                  <AnimeOverlay
                    show={editing}
                    onClick={() => handleSelect(i, anime.id)}
                  >
                    <input
                      type="checkbox"
                      checked={
                        selected.map((s) => s.id).indexOf(anime.id) !== -1
                      }
                      name=""
                      id=""
                    />
                  </AnimeOverlay>
                  <AnimeImage src={anime.coverImage.large} />
                  <Link key={i} href={`/detail/${anime.id}`}>
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
                  </Link>
                </AnimeCard>
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
                    <option key={i} value={val}>
                      {val} / page
                    </option>
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
