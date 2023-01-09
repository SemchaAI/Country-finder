import { useNavigate } from "react-router-dom";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectCountriesInfo,
  selectSearchCountries,
} from "../store/countries/countriesSelectors";
import { loadCountries } from "../store/countries/countriesActions";
import { selectControls } from "../store/controls/controlsSelectors";

const _ = require("lodash");

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectControls);

  // if (localStorage.getItem("state")) {
  const countries = useSelector((state) =>
    selectSearchCountries(state, { search, region })
  );
  console.log(countries);

  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    console.log("useEff");
    if (countries.length === 0) {
      console.log("load");
      dispatch(loadCountries());
    }
  }, [search, region, countries.length, dispatch]);
  return (
    <>
      <Controls />
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
