import cls from "classnames";
import styles from "./index.module.less";

export default function Footer() {
    return (
        <div className={styles.info}>
            <span className={cls(styles.text, styles.title)}>Draw & Guess  </span>
            <span className={styles.text}>Created by <a href="" >sanli</a>
            </span>
        </div>
    );
}