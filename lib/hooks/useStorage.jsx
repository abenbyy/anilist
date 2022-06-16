import { useEffect, useState } from "react";

export default function useStorage() {
  const [state, setState] = useState([]);

  const add = (collectionName, value) => {
    let idx = state.map((col) => col.name).indexOf(collectionName);
    if (idx === -1) {
      let newState = [
        ...state,
        {
          name: collectionName,
          list: [value],
        },
      ];
      setState(newState);
      localStorage.setItem("collections", JSON.stringify(newState));
    } else {
      let collection = state[idx];
      let valIdx = collection.list.map((anime) => anime.id).indexOf(value.id);
      if (valIdx !== -1) return;
      collection.list.push(value);
      let newState = [...state];
      newState[idx] = collection;
      setState(newState);
      localStorage.setItem("collections", JSON.stringify(newState));
    }
  };
  const isInCollection = (collectionName, animeTitle) => {
    let idx = state.map((col) => col.name).indexOf(collectionName);
    if (idx === -1) return false;
    let collection = state[idx];
    let valIdx = collection.list
      .map((anime) => anime.title)
      .indexOf(animeTitle);

    return valIdx !== -1;
  };

  const updateCollection = (oldName, newName) => {
    console.log(oldName, newName);
    let idx = state.map((col) => col.name).indexOf(oldName);
    let newState = [...state];

    newState[idx].name = newName;
    setState(newState);
    localStorage.setItem("collections", JSON.stringify(newState));
  };

  const remove = (collectionName, value) => {
    let idx = state.map((col) => col.name).indexOf(collectionName);
    let newState = [...state];
    let aIdx = newState[idx].list.map((col) => col.id).indexOf(value);
    newState[idx].list.splice(aIdx, 1);
    setState(newState);
    localStorage.setItem("collections", JSON.stringify(newState));
  };

  const removeCollection = (collectionName) => {
    let idx = state.map((col) => col.name).indexOf(collectionName);
    let newState = [...state];
    newState.splice(idx, 1);
    setState(newState);
    localStorage.setItem("collections", JSON.stringify(newState));
  };

  useEffect(() => {
    if (!localStorage.getItem("collections"))
      localStorage.setItem("collections", JSON.stringify([]));
    else setState(JSON.parse(localStorage.getItem("collections")));
  }, []);

  return [
    state,
    add,
    isInCollection,
    updateCollection,
    remove,
    removeCollection,
  ];
}
