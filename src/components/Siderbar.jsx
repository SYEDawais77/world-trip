import { Outlet } from "react-router";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
export default function Siderbar() {
  return (
    <div className={styles.sidebar}>
      <Logo  />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
