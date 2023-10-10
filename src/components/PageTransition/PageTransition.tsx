import { pageTransition } from '@/animations/transitions';
import { pageVariants } from '@/animations/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from '@/hooks/useRouter/useRouter';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence mode='popLayout'>
      <motion.div
        key={asPath}
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
