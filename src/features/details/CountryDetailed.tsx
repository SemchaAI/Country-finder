import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Info } from "./Info";
import { clearDetails, loadDetails } from "./detailsSlice";
import { selectDetails } from "./countryDetailed-selectors";
import { useAppDispatch } from "store";
import { NavigateFunction } from "react-router-dom";

export const CountryDetailed = ({
  name,
  navigate,
}: {
  name: string;
  navigate: NavigateFunction;
}) => {
  const dispatch = useAppDispatch();
  const currentCountry = useSelector(selectDetails);
  useEffect(() => {
    dispatch(loadDetails(name));
    return () => {
      dispatch(clearDetails()); //clearDetails  //setClear
    };
  }, [dispatch, name]);
  return <>{currentCountry && <Info push={navigate} {...currentCountry} />}</>;
};
