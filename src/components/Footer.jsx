import styles from "./Footer.module.css";
export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>
        Copyright &copy; {year} World Trip Inc. All rights
        reserved.
      </p>
    </div>
  );
}
