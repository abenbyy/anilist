import { useEffect, useState } from "react";

export default function useStorage() {
  const [state, setState] = useState([]);

  const isInCollection = (collectionName, animeTitle) => {
    let idx = state.map((col) => col.name).indexOf(collectionName);
    let collection = state[idx];
    let valIdx = collection.list
      .map((anime) => anime.title)
      .indexOf(animeTitle);

    return valIdx !== -1;
  };

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

  const remove = (collectionName, value) => {};

  useEffect(() => {
    if (!localStorage.getItem("collections"))
      localStorage.setItem("collections", JSON.stringify([]));
    else setState(JSON.parse(localStorage.getItem("collections")));
  }, []);

  return [state, add, isInCollection, remove];
}
