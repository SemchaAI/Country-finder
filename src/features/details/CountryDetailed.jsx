import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Info } from "../../features/details/Info";
import { setClear } from "../controls/controlsSlice";
import { clearDetails, loadDetails, selectDetails } from "./detailsSlice";

export const CountryDetailed = ({ name, navigate }) => {
  const dispatch = useDispatch();
  const currentCountry = useSelector(selectDetails);
  useEffect(() => {
    dispatch(loadDetails(name));
    return () => {
      dispatch(clearDetails()); //clearDetails  //setClear
    };
  }, [dispatch, name]);
  return <>{currentCountry && <Info push={navigate} {...currentCountry} />}</>;
};
