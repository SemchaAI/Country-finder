import { selectRegion } from "features/controls/controlsSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { setRegion } from "features/controls/controlsSlice";
import { CountryOption } from "features/controls/CustomSelect";
import { Region } from "types";
import { GroupBase, SingleValue } from "react-select";

type onSelect = (reg: SingleValue<CountryOption>) => void;

export const useRegions = (): [Region | "", onSelect] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);
  // console.log(region);

  const regionHandler: onSelect = (e) => {
    // console.log(e.value === "");
    if (e) {
      dispatch(setRegion(e.value));
    } else {
      dispatch(setRegion(""));
    }
  };
  return [region, regionHandler];
};
