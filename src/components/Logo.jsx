import { Link, useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";
import { useAuth } from "../contexts/FakeUserAuth";
export default function Logo() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogoClick = () => {
    logout();
    navigate("/home");
  };
  return (
    <Link onClick={handleLogoClick}>
      <img className={styles.logo} src="logo.png" alt="Logo" />
    </Link>
  );
}
