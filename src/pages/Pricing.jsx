// Uses the same styles as Product
import NavLinks from "../components/NavLinks";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <NavLinks />
      <section>
        <div>
          <h2>
            Simple pricing
            <br />
            Travel Packages & Pricing start from Just 50000 PKR
          </h2>
          <p>
            Choose the perfect plan for your next adventure with plan trip
            tracking.
            <br />
            Choose the perfect plan for your next adventure with planned trip tracking, ensuring you never miss a moment of your journey.
          </p>
        </div>
        <img src="waterfall.jpg" alt="Water Fall Image" />
      </section>
    </main>
  );
}
