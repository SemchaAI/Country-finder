import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { Button } from "components/Button";
import { CountryDetailed } from "features/details/CountryDetailed";

export const Details = () => {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {name && <CountryDetailed name={name} navigate={navigate} />}
    </div>
  );
};
