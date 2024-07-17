import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import NavLinks from "../components/NavLinks";
export default function Home() {
  return (
    <main className={styles.homepage}>
      <NavLinks />
      <section>
        <h1>
          Explore the World with World Trip
          <br />
          World trip will keep track of your trips
        </h1>
        <h2>
          Discover your next adventure with our expert travel guides and
          exclusive deals.
        </h2>
        <Link to="/login" className="cta">
          Start Your Journey
        </Link>
      </section>
    </main>
  );
}
