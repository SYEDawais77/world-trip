import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
export default function Logo() {
  return (
    <Link to="/home">
      <img className={styles.logo} src="logo.png" alt="Logo" />
    </Link>
  );
}
