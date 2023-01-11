import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { List } from "../../components/List";
import { Card } from "../../components/Card";

import {
  loadCountries,
  selectCountriesInfo,
  selectSearchCountries,
} from "./countriesSlice";
import { selectControls } from "../controls/controlsSlice";

export const CountriesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectControls);

  const countries = useSelector((state) =>
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
            const countryInfo = {
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
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
