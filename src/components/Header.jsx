import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMoon, IoMoonOutline } from "react-icons/io5";

import { Container } from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../store/theme/themeSelect";
import { loadTheme, switchTheme } from "../store/theme/themeAction";
import { selectControls } from "../store/controls/controlsSelectors";
import { setClear, setRegion } from "../store/controls/controlsActions";

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link).attrs({
  to: "/",
})`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  cursor: pointer;
  // font-weight: var(--fw-bold);
  text-transform: capitalize;
`;

export const Header = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  //const theme = "light";

  useEffect(() => {
    document.body.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handlerTheme = () => {
    dispatch(switchTheme(currentTheme));
  };
  const handlerControls = () => {
    dispatch(setClear());
  };

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title onClick={handlerControls}>Where is the world?</Title>
          <ModeSwitcher onClick={handlerTheme}>
            {currentTheme === "light" ? (
              <IoMoonOutline size="14px" />
            ) : (
              <IoMoon size="14px" />
            )}{" "}
            <span style={{ marginLeft: "0.75rem" }}>{currentTheme} Theme</span>
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};
