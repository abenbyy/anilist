import { useState } from "react";

export default function useStorage() {
  const [state, setState] = useState([]);

  if (!localStorage.getItem("collections"))
    localStorage.setItem("collections", JSON.stringify([]));

  const update = () => {};
}
