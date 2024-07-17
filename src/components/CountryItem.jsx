import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ city }) {
  return (
    <li className={styles.countryItem}>
      <span>{city.emoji}</span>
      <span>{city.country}</span>
    </li>
  );
}

CountryItem.propTypes = {
  city: PropTypes.object,
};

export default CountryItem;
