import Map from "../components/Map";
import Siderbar from "../components/Siderbar";
import styles from './AppLayout.module.css'
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Siderbar />
      <User />
      <Map />
    </div>
  );
}
