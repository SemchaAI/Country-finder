import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../features/controls/controlsSlice";
import _ from "lodash";

export const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const [state, setState] = useState("");
  const [debouncedState, setDebouncedState] = useState("");

  useEffect(() => {}, [search]); // rerender component after click on title

  const handleChange = (e) => {
    setState(e.target.value);
    debounce(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };

  const debounce = useCallback(
    _.debounce((_searchVal) => {
      setDebouncedState(_searchVal);
      // send the server request here
      dispatch(setSearch(_searchVal));
    }, 1000),
    []
  );
  return [search, handleChange, handleKeyPress];
};
