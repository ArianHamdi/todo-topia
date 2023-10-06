import { ReactElement, ReactNode, useState } from 'react';
import styles from './ContextMenu.module.scss';
import { useOutsideClickRef } from 'rooks';
import DropdownToggle from './ContextMenuToggle';
import type { IContextMenuItem } from './ContextMenuItem';

interface IContextMenu {
  children: ReactElement<IContextMenuItem> | ReactElement<IContextMenuItem>[];
}

const ContextMenu = ({ children }: IContextMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(prev => !prev);
  };

  const [ref] = useOutsideClickRef(toggleHandler, isOpen);

  return (
    <div className={styles.menu} ref={ref}>
      <DropdownToggle onClick={toggleHandler} />
      {isOpen && <ul className={styles.list}>{children}</ul>}
    </div>
  );
};

export default ContextMenu;
