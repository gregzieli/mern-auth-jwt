import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./auth.module.css";

const Social = () => {
  return (
    <div className={styles.social}>
      <a href="/#">
        <FontAwesomeIcon icon={faGoogle} fixedWidth />
      </a>
      <a href="/#">
        <FontAwesomeIcon icon={faTwitter} fixedWidth />
      </a>
      <a href="/#">
        <FontAwesomeIcon icon={faFacebook} fixedWidth />
      </a>
      <a href="/#">
        <FontAwesomeIcon icon={faGithub} fixedWidth />
      </a>
      <hr />
      or
      <hr />
    </div>
  );
};

export default Social;
