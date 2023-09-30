import { useState } from "react";
import styles from "./Dropdown.module.scss";
import { useOutsideClickRef } from "rooks";
import DropdownToggle from "./DropdownToggle";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const [ref] = useOutsideClickRef(toggleHandler, isOpen);

  return (
    <div ref={ref}>
      <DropdownToggle onClick={toggleHandler} />
    </div>
  );
};

export default Dropdown;
