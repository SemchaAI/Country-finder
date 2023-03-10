import styled from "styled-components";

import { Search } from "./Search";
import { CustomSelect } from "./CustomSelect";
import { useRegions } from "../../hooks/useRegions";
import { Region } from "types";

// type options = {
//   All: { value: Region; label: Region };
//   Africa: { value: Region; label: Region };
//   America: { value: Region; label: Region };
//   Asia: { value: Region; label: Region };
//   Europe: { value: Region; label: Region };
//   Oceania: { value: Region; label: Region };
// };

type optionS = Record<Exclude<Region, "">, { value: Region; label: Region }>;

const optionsMap: optionS = {
  All: { value: "", label: "All" },
  Africa: { value: "Africa", label: "Africa" },
  America: { value: "America", label: "America" },
  Asia: { value: "Asia", label: "Asia" },
  Europe: { value: "Europe", label: "Europe" },
  Oceania: { value: "Oceania", label: "Oceania" },
};
const options = Object.values(optionsMap);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Controls = () => {
  const [region, regionHandler] = useRegions();

  return (
    <Wrapper>
      <Search />
      <CustomSelect
        options={options}
        placeholder="Filter by Region"
        isSearchable={false}
        value={region ? optionsMap[region] : ""}
        onChange={(e) => regionHandler(e)}
      />
    </Wrapper>
  );
};
