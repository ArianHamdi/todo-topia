import { ReactNode } from "react";
import styles from "./Chip.module.scss";

interface IProps {
  variant: "success" | "danger";
  children: ReactNode;
}

const Chip = ({ variant, children }: IProps) => {
  return (
    <span className={styles.chip} data-variant={variant}>
      {children}
    </span>
  );
};

export default Chip;
