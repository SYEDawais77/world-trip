import CountryItem from "./CountryItem";
import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add Cities by Clicking on Map" />;

  let countries = [];
  function uniqueCountries() {
    cities.map((city) => {
      if (!countries.map((el) => el.country).includes(city.country)) {
        countries = [
          ...countries,
          { country: city.country, emoji: city.emoji },
        ];
      }
    });
    return countries;
  }

  countries = uniqueCountries();
  return (
    <ul className={styles.countryList}>
      {countries.map((city) => (
        // eslint-disable-next-line react/jsx-key
        <CountryItem city={city} key={city.country} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
