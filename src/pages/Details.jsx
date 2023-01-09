import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { Button } from "../components/Button";
import { Info } from "../components/Info";
import { loadCountryDetailed, setClear } from "../store/details/detailsActions";
import { useDispatch, useSelector } from "react-redux";
import { selectDetails } from "../store/details/detailsSelectors";
import { useEffect } from "react";

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCountry = useSelector(selectDetails);
  useEffect(() => {
    dispatch(loadCountryDetailed(name));
    return () => {
      dispatch(setClear());
    };
  }, [dispatch, name]);

  //console.log(currentCountry.flag);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
