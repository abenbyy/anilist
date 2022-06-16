import { css } from "@emotion/css";
import styled from "@emotion/styled";

import {
  NavBar,
  NavItem,
  Container,
  Center,
  CollectionCard,
  CollectionImage,
  CollectionList,
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
import { useState } from "react";
import {
  BACKGROUND,
  SECONDARY,
  TEXT_ON_PRIMARY_ALT,
  TEXT_ON_SECONDARY,
} from "styles/global";

export default function Collections() {
  const [storage, , , updateCollection, , removeCollection] = useStorage();
  const [editCollection, setEditCollection] = useState({
    old_name: "",
    new_name: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState("");

  const InverseButton = styled(Button)({
    backgroundColor: TEXT_ON_SECONDARY,
    color: SECONDARY,
  });
  const handleUpdateCollection = () => {
    updateCollection(editCollection.old_name, editCollection.new_name);
    setEditCollection({ ...editCollection, old_name: "", new_name: "" });
  };
  const handleConfirmDelete = (name) => {
    setShowDialog(true);
    setDeleteCollection(name);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
    setDeleteCollection("");
  };
  const handleDeleteCollection = () => {
    setShowDialog(false);
    removeCollection(name);
  };

  return (
    <>
      <Modal show={showDialog} title="Delete Collection?">
        <div>
          Are you sure you want to delete collection: {deleteCollection}?
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
          <Button onClick={handleDeleteCollection}>Delete</Button>
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
          <NavLogo />
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
              fontSize: "16pt",
            })}
          >
            Your Collections
          </div>
          <ResponsiveGrid cols={2} smallCols={1}>
            {storage.map((str, i) => (
              <CollectionCard key={i} onClick={() => {}}>
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  })}
                >
                  <Link href={`/collection/${str.name}`}>
                    <CollectionImage
                      src={
                        str.list.length > 0
                          ? str.list[0].image
                          : "https://anilist.co/img/icons/icon.svg"
                      }
                      alt=""
                    />
                  </Link>
                  <div
                    className={css({
                      marginLeft: "20px",
                      fontSize: "16pt",
                    })}
                  >
                    <div
                      className={css({
                        display: "flex",
                        alignItems: "center",
                      })}
                    >
                      {editCollection.old_name === str.name ? (
                        <>
                          <Input
                            className={css({
                              fontSize: "16pt",
                              marginBottom: "10px",
                              marginRight: "10px",
                            })}
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
                        <div>{str.name}</div>
                      )}
                      <Edit
                        onClick={() =>
                          setEditCollection({
                            ...editCollection,
                            old_name: str.name,
                          })
                        }
                        className={css({
                          display: `${
                            editCollection.old_name === str.name
                              ? "none"
                              : "block"
                          }`,
                          width: "14pt",
                          marginLeft: "5px",
                        })}
                      />
                    </div>
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
                  <Trash
                    onClick={() => handleConfirmDelete(str.name)}
                    className={css({
                      width: "20px",
                    })}
                  />
                </div>
              </CollectionCard>
            ))}
          </ResponsiveGrid>
        </Container>
      </Center>
    </>
  );
}
