import styled from "styled-components";

import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch } from "../store/controls/controlsSelectors";
import _ from "lodash";
import { useCallback, useState } from "react";
import { setSearch } from "../store/controls/controlsActions";

const InputContainer = styled.label`
  background-color: var(--colors-ui-base);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  border-radius: var(--radii);
  box-shadow: var(--shadow);
  width: 100%;
  margin-bottom: 1rem;

  @media (min-width: 767px) {
    margin-bottom: 0;
    width: 280px;
  }
`;

const Input = styled.input.attrs({
  type: "search",
  placeholder: "Search for a country...",
})`
  margin-left: 2rem;
  border: none;
  outline: none;
  color: var(--color-text);
  background-color: var(--colors-ui-base);
`;

export const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const [state, setState] = useState("");
  const [debouncedState, setDebouncedState] = useState("");

  // const [text, setText] = useState("");

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     dispatch(setSearch(text));
  //   }, 500);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [dispatch, text]);

  const handleChange = (e) => {
    //setText(e.target.value);
    setState(e.target.value);
    debounce(e.target.value);
    //dispatch(setSearch(e.target.value));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //dispatch(setSearch(e.target.value));
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

  return (
    <InputContainer>
      <IoSearch />
      <Input
        onChange={handleChange}
        //onBlur={handleSearch}
        type="text"
        onKeyDown={handleKeyPress}
        defaultValue={search}
      />
    </InputContainer>
  );
};
