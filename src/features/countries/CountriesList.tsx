import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { List } from "components/List";
import { Card } from "components/Card";

import { loadCountries } from "./countriesSlice";
import { CountryInfo } from "types";
import {
  selectCountriesInfo,
  selectSearchCountries,
} from "./countriesSelectors";
import { RootState, useAppDispatch } from "store";
import { selectControls } from "features/controls/controlsSelectors";

export const CountriesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search, region } = useSelector(selectControls);

  const countries = useSelector((state: RootState) =>
    selectSearchCountries(state, { search, region })
  );

  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    console.log(countries.length);
    if (countries.length === 0) {
      console.log("load");
      dispatch(loadCountries());
    }
  }, [search, region, countries.length, dispatch]);
  //   useEffect(() => {
  //     dispatch(loadCountries());
  //     //console.log(countries);
  //   }, [dispatch]);

  return (
    <>
      {error && <h2>cant fetch data</h2>}
      {status === "loading" && <h2>Loading</h2>}
      {status === "received" && (
        <List>
          {countries.map((c) => {
            const countryInfo: CountryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => void navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
