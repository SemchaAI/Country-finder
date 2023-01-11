import { useDispatch, useSelector } from "react-redux";
import { selectRegion, setRegion } from "../features/controls/controlsSlice";

export const useRegions = () => {
  const dispatch = useDispatch();
  const region = useSelector(selectRegion);
  // console.log(region);

  const regionHandler = (e) => {
    // console.log(e.value === "");
    dispatch(setRegion(e.value));
  };
  return [region, regionHandler];
};
