import { useDispatch } from "react-redux";
import { setClear } from "../features/controls/controlsSlice";

export const useCleanControls = () => {
  const dispatch = useDispatch();

  const handlerControls = () => {
    dispatch(setClear());
  };
  return handlerControls;
};
