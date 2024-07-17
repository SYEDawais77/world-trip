import NavLinks from "../components/NavLinks";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
    <NavLinks />
      <section>
        <img src="sunset.jpg" alt="Sunset Image" />
        <div>
          <h2>About World Trip</h2>
          <p>
            World Trip is your ultimate travel companion, offering personalized
            travel experiences, expert advice, and unbeatable deals. Whether you
            are planning a weekend getaway or a round-the-world adventure, we
            are here to make your journey unforgettable.
          </p>
          <p>
            World Trip is your ultimate travel companion, offering personalized
            travel experiences, expert advice, and unbeatable deals. Whether you
            are planning a weekend getaway or a round-the-world adventure, we
            are here to make your journey unforgettable.
          </p>
        </div>
      </section>
    </main>
  );
}
