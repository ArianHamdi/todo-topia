export const pageVariants = {
  initial: {
    opacity: 0,
    x: '100vw',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '-100vw',
  },
};

export const menuVariants = {
  open: {
    opacity: 1,
    scale: 1,
    y: 100,
    transition: {
      opacity: { duration: 0.1 },
      scale: { type: 'spring', stiffness: 260, damping: 20 },
    },
  },
  closed: {
    y: 100,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};
