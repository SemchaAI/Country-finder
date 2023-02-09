import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
} from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setSearch } from "../features/controls/controlsSlice";
import _ from "lodash";
import { selectSearch } from "features/controls/controlsSelectors";
import { useAppDispatch } from "store";

type onSearch = ChangeEventHandler<HTMLInputElement>;
type onPress = KeyboardEventHandler<HTMLInputElement>;

export const useSearch = (): [string, onSearch, onPress] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const [state, setState] = useState("");
  const [debouncedState, setDebouncedState] = useState("");

  useEffect(() => {}, [search]); // rerender component after click on title

  const handleChange: onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    debounce(e.target.value);
  };

  const handleKeyPress: onPress = (
    e: React.KeyboardEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };

  const debounce = useCallback(
    _.debounce((_searchVal: string) => {
      setDebouncedState(_searchVal);
      // send the server request here
      dispatch(setSearch(_searchVal));
    }, 1000),
    []
  );
  return [search, handleChange, handleKeyPress];
};
