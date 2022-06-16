import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  NavBar,
  NavItem,
  Container,
  Center,
  ResponsiveGrid,
  NavLogo,
  Modal,
  Trash,
  Edit,
  Button,
  Input,
} from "components";

import useStorage from "lib/hooks/useStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BACKGROUND,
  SECONDARY,
  TEXT_ON_PRIMARY,
  TEXT_ON_SECONDARY,
} from "styles/global";

const CollectionAnimeImage = styled.img({
  height: "250px",
  maxWidth: "200px",
});
const CollectionAnimeTitle = styled.div({
  color: `${TEXT_ON_PRIMARY}`,
  marginTop: "5px",
  fontsize: "10pt",
  maxWidth: "200px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});
const InverseButton = styled(Button)({
  backgroundColor: TEXT_ON_SECONDARY,
  color: SECONDARY,
});

export default function Collections() {
  const [storage, , , updateCollection, removeAnime] = useStorage();
  const router = useRouter();
  const { name } = router.query;
  const [collection, setCollection] = useState(null);
  const [currRoute, setCurrRoute] = useState("");
  const [editCollection, setEditCollection] = useState({
    editing: false,
    old_name: name,
    new_name: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [deleteAnime, setDeleteAnime] = useState(0);

  useEffect(() => {
    setCurrRoute(name);
  }, [name]);

  useEffect(() => {
    if (currRoute === "") return;
    let idx = storage.map((col) => col.name).indexOf(currRoute);
    setCollection(storage[idx]);
    setEditCollection({ ...editCollection, old_name: currRoute });
  }, [currRoute, storage]);

  const handleUpdateCollection = () => {
    updateCollection(editCollection.old_name, editCollection.new_name);
    setEditCollection({ ...editCollection, editing: false });
    setCurrRoute(editCollection.new_name);
  };
  const handleConfirmDelete = (id) => {
    setShowDialog(true);
    setDeleteAnime(id);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
    setDeleteAnime(0);
  };
  const handleDeleteAnime = () => {
    setShowDialog(false);
    removeAnime(currRoute, deleteAnime);
  };

  return (
    <>
      <Modal show={showDialog} title="Delete Collection?">
        <div>
          Are you sure you want to delete this anime from the collection?
        </div>
        <div
          className={css({
            width: "100%",
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
          })}
        >
          <InverseButton onClick={handleCancelDelete}>Cancel</InverseButton>
          <Button onClick={handleDeleteAnime}>Delete</Button>
        </div>
      </Modal>
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
              <NavItem>
                <div style={{ fontSize: "14pt" }}>Anime</div>
                <div style={{ fontSize: "8pt" }}>アニメ</div>
              </NavItem>
            </Link>
            <Link style={{ cursor: "pointer" }} href="/collections">
              <NavItem active={true}>
                <div style={{ fontSize: "14pt" }}>Collections</div>
                <div style={{ fontSize: "8pt" }}>コレクション</div>
              </NavItem>
            </Link>
          </div>
        </Container>
      </NavBar>
      <Center
        className={css({
          backgroundColor: BACKGROUND,
          padding: "20px 0 20px 0",
          minHeight: "calc(100vh - 20px)",
        })}
      >
        <Container>
          <div
            className={css({
              fontSize: "18pt",
              marginBottom: "20px",
            })}
          >
            {editCollection.editing ? (
              <>
                <Input
                  className={css({
                    fontSize: "16pt",
                    marginBottom: "5px",
                    marginRight: "10px",
                  })}
                  value={editCollection.new_name}
                  onChange={(e) =>
                    setEditCollection({
                      ...editCollection,
                      new_name: e.target.value,
                    })
                  }
                />
                <Button onClick={handleUpdateCollection}>Save</Button>
              </>
            ) : (
              <div>
                <div>{collection?.name}</div>
                <Edit
                  onClick={() =>
                    setEditCollection({
                      ...editCollection,
                      editing: true,
                      new_name: name,
                    })
                  }
                  className={css({
                    display: `${editCollection.editing ? "none" : "block"}`,
                    width: "14pt",
                    marginLeft: "5px",
                  })}
                />
              </div>
            )}
          </div>
          <ResponsiveGrid
            className={css({
              justifyItems: "center",
            })}
            cols={5}
            smallCols={1}
          >
            {collection?.list.length <= 0 && <div>No animes in collection</div>}
            {collection?.list.map((anime, i) => (
              <>
                <div
                  className={css({
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  })}
                >
                  <Link key={i} href={`/detail/${anime.id}`}>
                    <CollectionAnimeImage src={anime.image} alt="" />
                  </Link>

                  <CollectionAnimeTitle>
                    <div className={css({ width: "90%" })}>{anime.title}</div>
                    <Trash
                      className={css({
                        width: "20px",
                        height: "20px",
                        marginLeft: "5px",
                      })}
                      onClick={() => handleConfirmDelete(anime.id)}
                    />
                  </CollectionAnimeTitle>
                </div>
              </>
            ))}
          </ResponsiveGrid>
        </Container>
      </Center>
    </>
  );
}
