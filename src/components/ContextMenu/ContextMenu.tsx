import { ReactElement, ReactNode, useState } from 'react';
import styles from './ContextMenu.module.scss';
import { useOutsideClickRef } from 'rooks';
import DropdownToggle from './ContextMenuToggle';
import type { IContextMenuItem } from './ContextMenuItem';
import { AnimatePresence, motion } from 'framer-motion';
import { menuVariants } from '@/animations/variants';

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
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.list}
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextMenu;
