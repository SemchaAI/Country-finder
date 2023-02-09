import { setClear } from "features/controls/controlsSlice";
import { useAppDispatch } from "store";

export const useCleanControls = () => {
  const dispatch = useAppDispatch();

  const handlerControls = () => {
    dispatch(setClear());
  };
  return handlerControls;
};
